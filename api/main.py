from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks, Request
from fastapi.responses import JSONResponse
from analyze import analyze_code
import os
import zipfile
import shutil
import logging


logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)

app = FastAPI()

UPLOAD_FOLDER = "uploads"
EXTRACT_FOLDER = "extracted"


tasks_done = False
data = {}

def analyze_code_task(instructions_content, extract_path):
  global tasks_done, data
  java_files = []
  file_code = {}
  for root, _, files in os.walk(extract_path):
    for file in files:
      if file.endswith(".java"):
        file_path = os.path.join(root, file)
        with open(file_path, 'r', encoding='utf-8') as f:
          content = f.read()
          file_code[file] = content
          java_files.append((file, content))

  batch_size = 3
  final_result = []
  for i in range(0, len(java_files), batch_size):
    batch = java_files[i:i + batch_size]

    batch_code = ""
    for filename, content in batch:
      batch_code += f"<STUDENT>\n// File name: {filename}\n{content}\n</STUDENT>\n"

    batch_result = analyze_code(instructions_content, batch_code, batch=2)
    final_result.append(batch_result)
    logger.debug("1 batch done")

  combined_result = {
    "metadata": final_result[0].get("metadata"),
    "students": []
  }

  for result in final_result:
    for index, student in enumerate(result.get("students", [])):
      student_data = {
        "name": student["name"],
        "filename": student["filename"],
        "code": file_code[student["filename"]],  # not a great fix but
        "methods": student["methods"],
        "code_analysis": student["code_analysis"],
        "summary": student["summary"]
      }
      combined_result["students"].append(student_data)


  logger.debug(f"Done, setting data to {combined_result}")
  data = combined_result
  tasks_done = True

  cleanup_folders(UPLOAD_FOLDER, EXTRACT_FOLDER)


@app.post("/api/analyze")
async def analyze(background_tasks: BackgroundTasks, code: UploadFile = File(...), instructions: UploadFile = File(...)):
    if not code or not instructions:
      raise HTTPException(status_code=400, detail="No file part")

    if not code.filename or not instructions.filename:
      raise HTTPException(status_code=400, detail="No selected file")

    zip_path = None
    extract_path = None
    try:
      instructions_content = await instructions.read()
      instructions_content = instructions_content.decode('utf-8')

      if not code.filename.endswith(".zip"):
        code_content = await code.read()
        code_content = code_content.decode('utf-8')
        parsed_data = analyze_code(instructions_content, code_content, 1)
        return parsed_data

      zip_path = os.path.join(UPLOAD_FOLDER, code.filename)
      with open(zip_path, "wb") as f:
        f.write(await code.read())

      extract_path = os.path.join(EXTRACT_FOLDER, os.path.splitext(code.filename)[0])
      os.makedirs(extract_path, exist_ok=True)

      with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)

    except Exception as e:
      error_message = f"Error occurred during reading and unzipping of files. Details: {str(e)}"
      raise HTTPException(status_code=500, detail=error_message)

    background_tasks.add_task(analyze_code_task, instructions_content, extract_path)

    return {"message": "Files will be analyzed in the background"}



@app.route('/api/status', methods=['GET'])
def check_task_status(request: Request):
  global tasks_done
  if tasks_done:
    logger.debug("tasks_done == true")
    tasks_done = False
    return JSONResponse(content={"task_done": True, "data": data})
  else:
    logger.debug("tasks_done == false")
    return JSONResponse(content={"task_done": False})



def cleanup_folders(upload_folder, extract_folder):
  try:
    # Clean up UPLOAD_FOLDER
    for filename in os.listdir(upload_folder):
      file_path = os.path.join(upload_folder, filename)
      if os.path.isfile(file_path):
        os.remove(file_path)
        print(f"Removed {file_path} from UPLOAD_FOLDER.")
      elif os.path.isdir(file_path):
        shutil.rmtree(file_path)  # Remove directories if any
        print(f"Removed directory {file_path} from UPLOAD_FOLDER.")

    # Clean up EXTRACT_FOLDER
    for filename in os.listdir(extract_folder):
      file_path = os.path.join(extract_folder, filename)
      if os.path.isfile(file_path):
        os.remove(file_path)
        print(f"Removed {file_path} from EXTRACT_FOLDER.")
      elif os.path.isdir(file_path):
        shutil.rmtree(file_path)  # Remove directories if any
        print(f"Removed directory {file_path} from EXTRACT_FOLDER.")

  except Exception as e:
    print(f"Error during cleanup: {str(e)}")

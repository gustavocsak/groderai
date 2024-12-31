from flask import Flask, request, jsonify
from flask_cors import CORS
from main import analyze_code
import os
import zipfile

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
EXTRACT_FOLDER = "extracted"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(EXTRACT_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024

# frontend is on :3000
# api is on :5000
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if 'code' not in request.files or 'instructions' not in request.files:
       return jsonify({"error": "No file part"}), 400

    code = request.files['code']
    instructions = request.files['instructions']
    if not code.filename or not instructions.filename:
      return jsonify({"error": "No selected file"}), 400

    zip_path = None
    extract_path = None
    try:
      instructions_content = instructions.stream.read().decode('utf-8')
      print("here")
      if not code.filename.endswith(".zip"):
        code_content = code.stream.read().decode('utf-8')
        parsed_data = analyze_code(instructions_content, code_content, 1)
        return parsed_data



      zip_path = os.path.join(app.config["UPLOAD_FOLDER"], code.filename)
      code.save(zip_path)

      extract_path = os.path.join(EXTRACT_FOLDER, os.path.splitext(code.filename)[0])
      os.makedirs(extract_path, exist_ok=True)

      with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)

      all_code_content = ""
      for root, _, files in os.walk(extract_path):
        for file in files:
          if file.endswith(".java"):  # Only include Java files
            file_path = os.path.join(root, file)
            all_code_content += "<STUDENT>\n"
            with open(file_path, 'r', encoding='utf-8') as f:
                all_code_content += f"\n\n// File name: {file}\n" + f.read()
            all_code_content += "</STUDENT>\n"


      parsed_data = analyze_code(instructions_content, all_code_content, 2)

      return parsed_data
    except Exception as e:
      return jsonify({"error": str(e)}), 500

    finally:
      # Clean up the uploaded zip file and extracted files
      if zip_path and os.path.exists(zip_path):
        os.remove(zip_path)
      if extract_path and os.path.exists(extract_path):
        for root, dirs, files in os.walk(extract_path, topdown=False):
          for file in files:
            os.remove(os.path.join(root, file))
          for dir in dirs:
            os.rmdir(os.path.join(root, dir))
        os.rmdir(extract_path)

@app.route('/api')
def api():
  return '<p>welcome to groderai api</p>'


if __name__ == '__main__':
  app.run(debug=True)

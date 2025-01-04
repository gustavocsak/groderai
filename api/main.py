from dotenv import load_dotenv
import os
from pydantic import BaseModel
from typing import List, Literal
import google.generativeai as genai
import json
import subprocess


load_dotenv()

class Metadata(BaseModel):
  title: str
  summary: str
  requirements: list[str]
  language: str

class Method(BaseModel):
  prototype: str
  expected_prototype: str
  time_complexity: Literal["O(1)", "O(n)", "O(n^2)", "O(log n)", "O(n log n)"]
  is_documented: bool
  errors: List[str]
  is_correct: bool

class CodeAnalysis(BaseModel):
  readability: list[str]
  documentation: list[str]
  linting_errors: list[str]
  missing_requirements: list[str]
  restricted_usage: list[str]

class Student(BaseModel):
  name: str
  filename: str
  methods: list[Method]
  code_analysis: CodeAnalysis
  summary: list[str]

class Assignment(BaseModel):
  metadata: Metadata
  students: list[Student]

gemini_key = os.getenv('GEMINI_KEY')
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  system_instruction="Act as a coding assistant tool, identify fields in the assignment and report any errors in the code"
)

def lint_code(code):
  file_path = "temp.java"
  with open(file_path, 'w') as f:
    f.write(code)

  command = [
    'java', '-jar', 'checkstyle-10.21.1-all.jar',
    '-c', '/google_checks.xml', file_path
  ]
  result = subprocess.run(command, capture_output=True, text=True)
  os.remove(file_path)

  if result.returncode == 0:
    print("Linter passed with no issues.")
    return result.stdout
  else:
    print("Linter found issues:")
    return result.stderr

  return result

def analyze_code(instructions, code, batch):

  linter_results = ""
  if batch == 1:
    linter_results = lint_code(code)

  prompt = f"""
    <ROLE>
    You are part of GroderAI, a tool designed to augment the grading process for coding assignments by analyzing
    Carefully examine the assignment instructions and provide answers for the metadata of the assignment.
    Identify and highlight key details and important information.
    Provide a concise summary of important points to pay attention when grading that file.
    Present your findings in alignment with the provided response schema.
    Ensure all fields in the response schema are filled, if something is not applicable use "N/A"
    </ROLE>

    <DATA>
      <INSTRUCTIONS>
      {instructions}
      </INSTRUCTIONS>

      <CODE>
      {code}
      </CODE>

      <LINTING_RESULTS>
      {linter_results}
      </LINTING_RESULTS>
    </DATA>
  """

  prompt_batch = f"""
    <ROLE>
    You are GroderAI, an AI tool designed to assist in grading coding assignments by analyzing assignment instructions, student code, and linting results. Your job is to provide a detailed report strictly following the response schema.

    **Key Rules:**
    1. Adhere strictly to the schema. Do not include any extra information or omit required fields.
    2. Identify key information in the assignment instructions and populate the metadata field of the assignment.
    3. Analyze each code provided and populate the fields needed, dp not be vague, be extremely specific.
    4. For the summary, be very specific, concise and direct. Break down phrases in multiple strings.
    4. If a field is not applicable, write "N/A.
    5. Separate your analysis by students.
    </ROLE>

    <DATA>
      <ASSIGNMENT_INSTRUCTIONS>
      {instructions}
      </ASSIGNMENT_INSTRUCTIONS>

      <CODE>
      {code}
      </CODE>

      <LINTING_RESULTS>
      {linter_results}
      </LINTING_RESULTS>
    </DATA>
  """

  result = model.generate_content(
    prompt if batch == 1 else prompt_batch,
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=Assignment
    ),
  )

  parsed_data = json.loads(result.text)



  # try:
  #     # Attempt to load the JSON data
  #   parsed_data = json.loads(result.text)
  # except json.JSONDecodeError as e:
  #   print(f"Error decoding JSON: {e}")
  #   # Optionally write the raw response to a file for inspection
  #   with open("raw_response.txt", "w") as raw_file:
  #     raw_file.write(result.text)
  #   return "error"

  # # Write parsed data to a JSON file
  # with open("parsed_data.json", "w") as outfile:
  #   json.dump(parsed_data, outfile, indent=4)

  return parsed_data

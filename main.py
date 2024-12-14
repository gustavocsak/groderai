from dotenv import load_dotenv
import os
from pydantic import BaseModel
from typing import List, Literal
import google.generativeai as genai
import json

load_dotenv()

with open("assignment.txt", "r") as f:
  instructions = f.read()

with open("sample2.java", "r") as f:
  code = f.read()

class Method(BaseModel):
  prototype: str
  expected_prototype: str
  time_complexity: Literal["O(1)", "O(n)", "O(n^2)", "O(log n)", "O(n log n)"]
  is_documented: bool
  indentation: Literal["Consistent", "Inconsistent"]
  naming_convention: Literal["Consistent", "Inconsistent"]
  errors: List[str]
  is_correct: bool

class Report(BaseModel):
  methods: List[Method]
  notes: List[str]


gemini_key = os.getenv('GEMINI_KEY')
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  system_instruction="Act as a coding assistant tool, report any errors and findings according to the assignment instructions given"
)

prompt = f"""
  Analyze the following assignment instructions and the provided student code. Evaluate each method in the code based on the instructions and generate a report.

  **Important**:
  1. Every method in the student code must include all attributes from the schema.
  2. Ensure the evaluation considers the assignment instructions provided.
  4. Explain any possible errors or not allowed classes/methods in the `errors` array
  5. If a method is not described in the assignment instructions, fill the expected_prototype with "N/A"
  6. Any additional notes go into the notes field (missing requirements, methods), make it very brief, separate into multiple strings

  Instructions:
  {instructions}

  Student code:
  {code}
"""


result = model.generate_content(
    prompt,
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=Report
    ),
)

parsed_data = json.loads(result.text)
print(json.dumps(parsed_data, indent=4))

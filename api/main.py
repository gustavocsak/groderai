from dotenv import load_dotenv
import os
from pydantic import BaseModel
from typing import List, Literal
import google.generativeai as genai
import json

load_dotenv()

class Metadata(BaseModel):
  title: str
  description: str
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

class Assignment(BaseModel):
  metadata: Metadata
  methods: list[Method]
  code_analysis: CodeAnalysis



gemini_key = os.getenv('GEMINI_KEY')
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  system_instruction="Act as a coding assistant tool, report any errors and findings according to the assignment instructions given"
)


def analyze_code(instructions, code):
  prompt = f"""
    You are part of GroderAI, a tool designed to augment the grading process for coding assignments by analyzing and summarizing both the submitted code and the assignment instructions. Your goal is to provide a clear and concise report.
    ### Task
    - You will receive a text containing the assignment instructions.
    - Along with this, you will analyze the code submitted by the student.

    ### Role
    - Your responsibility is to carefully examine the assignment instructions and the student's code.
    - Identify and highlight key details and important information.
    - Present your findings in alignment with the provided response schema.
    - You must fill all the fields in the report, if something is not applicable use "N/A"

    Instructions:
    {instructions}

    Student code:
    {code}
  """

  result = model.generate_content(
      prompt,
      generation_config=genai.GenerationConfig(
          response_mime_type="application/json", response_schema=Assignment
      ),
  )

  parsed_data = json.loads(result.text)
  return parsed_data

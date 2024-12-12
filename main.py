from dotenv import load_dotenv
import os

load_dotenv()

import google.generativeai as genai

gemini_key = os.getenv('GEMINI_KEY')
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Explain how AI works")
print(response.text)

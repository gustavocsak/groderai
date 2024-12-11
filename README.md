# GroderAI
Analyze and summarize code to augment grading

## Setup

Blank for now

## Overview

GroderAI is a tool designed to analyze and summarize code submissions using language models and linters. The project evaluates the submitted code for errors, inefficiencies, and adherence to assignment requirements. It generates a summary, providing insights into coding style, correctness, and compliance with given instructions, helping educators optimize the grading process.

## 1. Input Data
The input data contains
- A code file
- A text file containing the assignment instructions/requirements

 ## 2. Output Data

 The output file is a markdown file containing the generated summary for the code file provided according to the assignment instructions.

 The summary may contain
 - Information on code readability, documentation, indentation
 - Potential mistakes and inefficiencies
   - Syntax errors
   - Time and space complexity if relevant
   - Redundant code
   - Mismatch on function prototypes
   - Use of not allowed libraries and/or functions
 - Correct concepts applied and requirements fulfilled
   - Functions/methods required are present and implemented correctly
   - Proper variable, constant and class naming

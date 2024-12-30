import subprocess
import os

def wrap_code(code):
    # Check if the provided code contains a class declaration
  if 'class ' in code:
    # If it already contains a class, just wrap the code inside the class
    return code
  else:
    # If no class, wrap the code inside a minimal class
    return f"""
    public class Temp {{
      {code}
    }}
    """


def lint_code(code):
  file_path = "temp.java"
  wrapped = wrap_code(code)
  with open(file_path, 'w') as f:
    f.write(wrapped)

  command = [
    'java', '-jar', 'checkstyle-10.21.1-all.jar',
    '-c', '/google_checks.xml', file_path
  ]
  result = subprocess.run(command, capture_output=True, text=True)
  os.remove(file_path)

  if result.returncode == 0:
    print("Linter passed with no issues.")
    print(result.stdout)
  else:
    print("Linter found issues:")
    print(result.stderr)

  return result

lint_code("""/**
 * Returns true if the array contains the given character
 *
 * @param arr the array to be searched
 * @param c the character to search for
 * @return {@code true} if the array contains the character {@code c}, {@code false} otherwise
 */
public boolean containsCharacter(char[] arr, char c) {
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] != c) {
      return true;
    }
  }
  return false;
}""")

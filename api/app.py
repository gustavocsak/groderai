from flask import Flask, request, jsonify
from flask_cors import CORS
from main import analyze_code

app = Flask(__name__)

# frontend is on :3000
# api is on :5000
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if 'code' not in request.files or 'instructions' not in request.files:
       return jsonify({"error": "No file part"}), 400

    code = request.files['code']
    instructions = request.files['instructions']
    if code.filename == '' or instructions.filename == '':
      return jsonify({"error": "No selected file"}), 400


    try:
      code_content = code.stream.read().decode('utf-8')
      instructions_content = instructions.stream.read().decode('utf-8')
      parsed_data = analyze_code(instructions_content, code_content)
      return parsed_data
    except Exception as e:
      return jsonify({"error": str(e)}), 500

@app.route('/api')
def api():
  return '<p>welcome to groderai api</p>'


if __name__ == '__main__':
  app.run(debug=True)

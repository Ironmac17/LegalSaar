const { execFile } = require("child_process");
const path = require("path");

const PYTHON_PATH = path.join(
  __dirname,
  "..",
  "..",
  "venv",
  "bin",
  "python"
);

const SCRIPT_PATH = path.join(
  __dirname,
  "transcribe.py"
);

const speechToText = (audioPath) => {
  return new Promise((resolve, reject) => {
    execFile(PYTHON_PATH, [SCRIPT_PATH, audioPath], (err, stdout) => {
      if (err) return reject(err);

      const result = JSON.parse(stdout);
      resolve(result.text);
    });
  });
};

module.exports = { speechToText };

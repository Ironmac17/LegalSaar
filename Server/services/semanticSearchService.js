const { execFile } = require("child_process");
const path = require("path");

const PYTHON_PATH = "/Users/nimishagrawal/new-env/bin/python3";

const SEARCH_SCRIPT = path.join(
  __dirname,
  "..",
  "ml",
  "embeddings",
  "search.py"
);

const semanticSearch = (query) => {
  return new Promise((resolve, reject) => {
    execFile(
      PYTHON_PATH,
      [SEARCH_SCRIPT, query],
      (error, stdout, stderr) => {
        if (error) {
          return reject(stderr || error.message);
        }
        try {
          const result = JSON.parse(stdout);
          resolve(result);
        } catch (e) {
          reject("Invalid response from ML service");
        }
      }
    );
  });
};

module.exports = { semanticSearch };

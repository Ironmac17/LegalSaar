const { spawn } = require('child_process');
const path = require('path');

const askQuestionController = async (req, res, next) => {
  try {
    const { question, documentId } = req.body;
    const { lang } = req.query;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    let clauses = [];
    if (documentId) {
      const Clause = require("../models/Clause");
      const foundClauses = await Clause.find({ document: documentId }).select('text');
      clauses = foundClauses.map(c => ({ text: c.text }));
    }

    // Call Python pipeline with virtualenv using stdin JSON to avoid CLI escaping issues
    const mlDir = path.join(__dirname, '../ml/services');
    const pythonCmd = '/Users/nimishagrawal/tf-env/bin/python3';
    const script = 'run_pipeline.py';

    const proc = spawn(pythonCmd, [script], { cwd: mlDir });
    const payload = JSON.stringify({ question, clauses });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('error', (error) => {
      console.error('ML Pipeline spawn Error:', error);
      return res.status(500).json({ error: 'ML service failed', details: error.message });
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        console.error('ML Pipeline Error:', code, stderr);
        return res.status(500).json({ error: 'ML service failed', details: stderr || `exit code ${code}` });
      }

      try {
        const result = JSON.parse(stdout.trim());
        if (result.error) {
          console.error('ML Error:', result.error);
          return res.status(500).json({ error: 'ML pipeline error', details: result.error });
        }

        // Backward and forward compatibility
        if (!result.explanation && result.answer) {
          result.explanation = result.answer;
        }

        res.json(result);
      } catch (parseError) {
        console.error('Parse Error:', parseError);
        console.error('stdout:', stdout);
        res.status(500).json({ error: 'Invalid ML response', details: stdout });
      }
    });

    proc.stdin.write(payload);
    proc.stdin.end();

  } catch (error) {
    next(error);
  }
};

module.exports = { askQuestionController };

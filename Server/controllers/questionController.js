const { exec } = require('child_process');
const path = require('path');

const askQuestionController = async (req, res, next) => {
  try {
    const { question } = req.body;
    const { lang } = req.query;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // Call Python pipeline with virtualenv
    const mlDir = path.join(__dirname, '../ml/services');
    const command = `cd "${mlDir}" && /Users/nimishagrawal/tf-env/bin/python3 run_pipeline.py "${question.replace(/"/g, '\\"')}"`;

    exec(command, { shell: '/bin/zsh' }, (error, stdout, stderr) => {
      if (error) {
        console.error('ML Pipeline Error:', error);
        console.error('stderr:', stderr);
        return res.status(500).json({ error: 'ML service failed', details: stderr });
      }

      try {
        const result = JSON.parse(stdout.trim());
        res.json(result);
      } catch (parseError) {
        console.error('Parse Error:', parseError);
        console.error('stdout:', stdout);
        res.status(500).json({ error: 'Invalid ML response', details: stdout });
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { askQuestionController };

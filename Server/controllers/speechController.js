const { speechToText } = require("../ml/voice/sttService");

const transcribeAudioController = async (req, res, next) => {
  try {
    const text = await speechToText(req.file.path);

    res.json({
      transcript: text
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { transcribeAudioController };

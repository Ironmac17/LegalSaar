const transcribeAudioController = async (req, res, next) => {
  try {
    // STT service removed - placeholder response
    res.json({
      transcript: "Speech-to-text functionality is currently disabled."
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { transcribeAudioController };

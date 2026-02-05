const gtts = require("gtts");
const path = require("path");

const generateSpeech = (text, lang = "en") => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      `../../temp/audio_${Date.now()}.mp3`
    );

    const speech = new gtts(text, lang);

    speech.save(filePath, (err) => {
      if (err) return reject(err);
      resolve(filePath);
    });
  });
};

module.exports = { generateSpeech };

const axios = require("axios");

/**
 * targetLang examples:
 * hi, ta, te, bn, mr, gu, kn, ml, pa
 */
const translateText = async (text, targetLang) => {
  if (!targetLang || targetLang === "en") {
    return text;
  }

  const response = await axios.post(
    "https://api.mymemory.translated.net/get",
    null,
    {
      params: {
        q: text,
        langpair: `en|${targetLang}`
      }
    }
  );

  return response.data.responseData.translatedText;
};

module.exports = { translateText };

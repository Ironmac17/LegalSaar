const path = require("path");
const Tesseract = require("tesseract.js");
const pdfParse = require("pdf-parse");

const OCR_LANG_PATH = path.join(__dirname, "..", "ocr-data");

const extractTextFromPDF = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};

const extractTextFromImage = async (buffer) => {
  const { data } = await Tesseract.recognize(buffer, "eng", {
    langPath: OCR_LANG_PATH,
    cachePath: OCR_LANG_PATH
  });
  return data.text;
};

module.exports = {
  extractTextFromPDF,
  extractTextFromImage
};

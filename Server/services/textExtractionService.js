const pdfParse = require("pdf-parse").default;
const Tesseract = require("tesseract.js");

const extractTextFromPDF = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};

const extractTextFromImage = async (buffer) => {
  const { data } = await Tesseract.recognize(buffer, "eng");
  return data.text;
};

module.exports = {
  extractTextFromPDF,
  extractTextFromImage
};

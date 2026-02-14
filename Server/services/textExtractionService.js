const path = require("path");
const fs = require("fs");
const Tesseract = require("tesseract.js");
const pdfParse = require("pdf-parse");

const OCR_LANG_PATH = path.join(__dirname, "..", "ocr-data");

/* ---------- PDF ---------- */
const extractTextFromPDF = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};

/* ---------- IMAGE OCR ---------- */
const extractTextFromImage = async (buffer) => {
  const { data } = await Tesseract.recognize(buffer, "eng", {
    langPath: OCR_LANG_PATH,
    cachePath: OCR_LANG_PATH
  });
  return data.text;
};

/* ---------- TXT ---------- */
const extractTextFromTxt = async (buffer) => {
  return buffer.toString("utf8");
};

module.exports = {
  extractTextFromPDF,
  extractTextFromImage,
  extractTextFromTxt
};

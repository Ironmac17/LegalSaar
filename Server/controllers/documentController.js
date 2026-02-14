const Document = require("../models/Document");
const { uploadToCloudinary } = require("../services/cloudinaryService");
const { linkClausesToKnowledge } = require("../services/clauseKnowledgeLinkService");
const {
  extractTextFromPDF,
  extractTextFromImage,
  extractTextFromTxt
} = require("../services/textExtractionService");
const { saveClauses } = require("../services/clauseService");

const uploadDocumentController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    let fileType = "";

    if (req.file.mimetype === "application/pdf") {
      fileType = "pdf";
    }
    else if (req.file.mimetype.startsWith("image")) {
      fileType = "image";
    }
    else if (req.file.mimetype === "text/plain") {
      fileType = "txt";
    }
    else {
      return res.status(400).json({ message: "Unsupported file type" });
    }


    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "documents"
    );

    const document = await Document.create({
      user: req.user.id,
      fileUrl: uploadResult.secure_url,
      fileType,
      originalName: req.file.originalname
    });

    let text = "";
    if (fileType === "pdf") {
      text = await extractTextFromPDF(req.file.buffer);
    } else if (fileType === "image") {
      text = await extractTextFromImage(req.file.buffer);
    } else {
      text = await extractTextFromTxt(req.file.buffer);
    }

    await saveClauses(document._id, text);
    await linkClausesToKnowledge(document._id);

    document.status = "processed";
    await document.save();

    res.status(201).json({
      message: "Document uploaded and processed",
      documentId: document._id
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadDocumentController };

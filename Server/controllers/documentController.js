const Document = require("../models/Document");
const { uploadToCloudinary } = require("../services/cloudinaryService");
const { linkClausesToKnowledge } = require("../services/clauseKnowledgeLinkService");
const {
  extractTextFromPDF,
  extractTextFromImage,
  extractTextFromTxt,
} = require("../services/textExtractionService");
const { saveClauses } = require("../services/clauseService");
const {
  validateFileSize,
  validateFileType,
  validateObjectId,
} = require("../utils/validation");
const {
  ValidationError,
  NotFoundError,
  InternalServerError,
} = require("../utils/errors");

const uploadDocumentController = async (req, res, next) => {
  try {
    // Validate file exists
    if (!req.file) {
      throw new ValidationError("File is required");
    }

    // Validate file size (10MB default)
    const sizeValidation = validateFileSize(req.file.size, 10);
    if (!sizeValidation.valid) {
      throw new ValidationError(sizeValidation.error);
    }

    // Validate file type
    const typeValidation = validateFileType(req.file.mimetype);
    if (!typeValidation.valid) {
      throw new ValidationError(typeValidation.error);
    }

    const fileType = typeValidation.fileType;

    // Validate filename
    if (!req.file.originalname || req.file.originalname.length === 0) {
      throw new ValidationError("Invalid filename");
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "documents"
    );

    if (!uploadResult || !uploadResult.secure_url) {
      throw new InternalServerError("Failed to upload file to cloud storage");
    }

    // Create document record
    const document = await Document.create({
      user: req.user.id,
      fileUrl: uploadResult.secure_url,
      fileType,
      originalName: req.file.originalname,
      status: "processing",
    });

    // Extract text based on file type
    let text = "";
    try {
      if (fileType === "pdf") {
        text = await extractTextFromPDF(req.file.buffer);
      } else if (fileType === "image") {
        text = await extractTextFromImage(req.file.buffer);
      } else {
        text = await extractTextFromTxt(req.file.buffer);
      }

      if (!text || text.trim().length === 0) {
        throw new ValidationError("Could not extract text from document");
      }
    } catch (extractError) {
      document.status = "failed";
      await document.save();
      throw new InternalServerError(
        `Text extraction failed: ${extractError.message}`
      );
    }

    // Save clauses and create links
    try {
      await saveClauses(document._id, text);
      await linkClausesToKnowledge(document._id);
    } catch (processError) {
      document.status = "failed";
      await document.save();
      throw new InternalServerError(
        `Document processing failed: ${processError.message}`
      );
    }

    // Mark document as processed
    document.status = "processed";
    await document.save();

    res.status(201).json({
      success: true,
      message: "Document uploaded and processed successfully",
      documentId: document._id,
      document: {
        id: document._id,
        fileUrl: document.fileUrl,
        originalName: document.originalName,
        fileType: document.fileType,
        status: document.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDocumentsController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Validate userId
    const idValidation = validateObjectId(userId);
    if (!idValidation.valid) {
      throw new ValidationError(idValidation.error);
    }

    // Get documents for user
    const documents = await Document.find({ user: userId })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDocumentController = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const userId = req.user.id;

    // Validate documentId
    const idValidation = validateObjectId(documentId);
    if (!idValidation.valid) {
      throw new ValidationError(idValidation.error);
    }

    // Find and check ownership
    const document = await Document.findById(documentId);
    if (!document) {
      throw new NotFoundError("Document");
    }

    if (document.user.toString() !== userId) {
      throw new ValidationError("Not authorized to delete this document");
    }

    // Delete document
    await Document.findByIdAndDelete(documentId);

    res.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocumentController,
  getDocumentsController,
  deleteDocumentController,
};

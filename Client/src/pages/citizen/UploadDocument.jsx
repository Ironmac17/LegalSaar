import { useState, useContext } from "react";
import api from "../../api/api";
import { FiUpload, FiFile, FiX, FiCheckCircle } from "react-icons/fi";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { t } from "../../utils/i18n";

const ALLOWED_TYPES = [
  ".pdf",
  ".doc",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
  ".txt",
];

export default function UploadDocument() {
  const { language } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (f) => {
    if (!f) return false;
    const ext = "." + f.name.split(".").pop().toLowerCase();
    return ALLOWED_TYPES.includes(ext) && f.size <= 10 * 1024 * 1024; // 10MB
  };

  const handleFile = (f) => {
    setError("");
    if (!f) {
      setFile(null);
      return;
    }
    if (!validateFile(f)) {
      setError(t("invalidFileError", language));
      return;
    }
    setFile(f);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  const upload = async () => {
    if (!file) {
      setError(t("pleaseSelectFile", language));
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);

      await api.post("/documents/upload", form);
      setUploadSuccess(true);
      setFile(null);
    } catch (err) {
      setError(
        err.response?.data?.message || t("uploadFailed", language),
      );
    } finally {
      setUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <FiCheckCircle className="w-16 h-16 text-success-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("uploadSuccessTitle", language)}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("uploadSuccessDesc", language)}
          </p>
          <div className="space-y-3">
            <Link
              to="/assistant"
              className="block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              {t("goToAssistant", language)}
            </Link>
            <button
              onClick={() => {
                setUploadSuccess(false);
              }}
              className="block w-full bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              {t("uploadAnother", language)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("uploadDocumentPageTitle", language)}
          </h1>
          <p className="text-gray-600 text-lg">
            {t("uploadDocumentPageSubtitle", language)}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg text-danger-700 flex items-start gap-3">
            <FiX size={20} className="flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition ${dragActive
            ? "border-primary-600 bg-primary-50"
            : "border-gray-300 hover:border-primary-600 hover:bg-gray-50"
            }`}
        >
          <FiUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("dragDropTitle", language)}
          </h2>
          <p className="text-gray-600 mb-6">{t("orClickBelow", language)}</p>

          <input
            type="file"
            id="file-input"
            accept={ALLOWED_TYPES.join(",")}
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
            className="hidden"
            disabled={uploading}
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <Button variant="primary" size="lg" disabled={uploading} as="span">
              {t("chooseFile", language)}
            </Button>
          </label>

          <p className="text-gray-500 text-sm mt-4">
            {t("supportedFiles", language)} {ALLOWED_TYPES.join(", ")} • {t("maxFileSize", language)}
          </p>
        </div>

        {/* Selected File */}
        {file && (
          <div className="mt-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FiFile className="w-12 h-12 text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-gray-600 text-sm">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-danger-600 transition"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Upload Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={upload}
                loading={uploading}
                disabled={!file || uploading}
                size="lg"
              >
                {uploading ? t("uploading", language) : t("uploadAndAnalyze", language)}
              </Button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary-600 mb-2">1</div>
            <h3 className="font-semibold text-gray-900">{t("stepUpload", language)}</h3>
            <p className="text-gray-600 text-sm">{t("stepUploadDesc", language)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-accent-600 mb-2">2</div>
            <h3 className="font-semibold text-gray-900">{t("stepAnalyze", language)}</h3>
            <p className="text-gray-600 text-sm">{t("stepAnalyzeDesc", language)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-success-600 mb-2">3</div>
            <h3 className="font-semibold text-gray-900">{t("stepUnderstand", language)}</h3>
            <p className="text-gray-600 text-sm">{t("stepUnderstandDesc", language)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

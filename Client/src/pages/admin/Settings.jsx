import { useState } from "react";
import {
  FiSettings,
  FiToggleRight,
  FiToggleLeft,
  FiSave,
  FiAlertTriangle,
} from "react-icons/fi";
import Button from "../../components/Button";

export default function Settings() {
  const [settings, setSettings] = useState({
    requireSourceApproval: true,
    maxDocumentSizeInMB: 10,
    enableVoiceSearch: true,
    enableVoiceOutput: true,
    requireUserVerification: true,
    maxQueriesPerDay: 100,
    safetyLevel: "strict",
    blockedKeywords: ["harmful advice", "illegal activity", "violence"],
    trustedSources: [
      "Legal Information Institute",
      "Government of India",
      "NITI Aayog",
    ],
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    setSaved(false);
  };

  const handleSave = () => {
    // TODO: API call to save settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
          <FiSettings className="text-primary-600" size={32} />
          Platform Settings
        </h1>
        <p className="text-gray-600 mb-12">
          Configure safety rules and platform behavior
        </p>

        {/* Save Notification */}
        {saved && (
          <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg text-success-700">
            Settings saved successfully!
          </div>
        )}

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* API & Access */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              API & Access Control
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">
                    Require Source Approval
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    All knowledge sources must be approved before use
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("requireSourceApproval")}
                  className="text-3xl"
                >
                  {settings.requireSourceApproval ? (
                    <span className="text-success-600">
                      <FiToggleRight />
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      <FiToggleLeft />
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">
                    Require User Verification
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Users must verify their phone number
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("requireUserVerification")}
                  className="text-3xl"
                >
                  {settings.requireUserVerification ? (
                    <span className="text-success-600">
                      <FiToggleRight />
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      <FiToggleLeft />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Features</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">
                    Enable Voice Search
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Allow users to search using voice
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("enableVoiceSearch")}
                  className="text-3xl"
                >
                  {settings.enableVoiceSearch ? (
                    <span className="text-success-600">
                      <FiToggleRight />
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      <FiToggleLeft />
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">
                    Enable Voice Output
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Read answers aloud using text-to-speech
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("enableVoiceOutput")}
                  className="text-3xl"
                >
                  {settings.enableVoiceOutput ? (
                    <span className="text-success-600">
                      <FiToggleRight />
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      <FiToggleLeft />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Rate Limiting
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Queries Per Day Per User
                </label>
                <input
                  type="number"
                  value={settings.maxQueriesPerDay}
                  onChange={(e) => {
                    setSettings({
                      ...settings,
                      maxQueriesPerDay: parseInt(e.target.value),
                    });
                    setSaved(false);
                  }}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Document Upload Size (MB)
                </label>
                <input
                  type="number"
                  value={settings.maxDocumentSizeInMB}
                  onChange={(e) => {
                    setSettings({
                      ...settings,
                      maxDocumentSizeInMB: parseInt(e.target.value),
                    });
                    setSaved(false);
                  }}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-danger-600">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiAlertTriangle className="text-danger-600" />
              Safety Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Safety Level
                </label>
                <select
                  value={settings.safetyLevel}
                  onChange={(e) => {
                    setSettings({ ...settings, safetyLevel: e.target.value });
                    setSaved(false);
                  }}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-danger-500"
                >
                  <option value="relaxed">Relaxed</option>
                  <option value="moderate">Moderate</option>
                  <option value="strict">Strict</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blocked Keywords (one per line)
                </label>
                <textarea
                  value={settings.blockedKeywords.join("\n")}
                  onChange={(e) => {
                    setSettings({
                      ...settings,
                      blockedKeywords: e.target.value
                        .split("\n")
                        .filter((k) => k),
                    });
                    setSaved(false);
                  }}
                  rows="4"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-danger-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Trusted Sources */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Trusted Information Sources
            </h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Approved Sources (one per line)
              </label>
              <textarea
                value={settings.trustedSources.join("\n")}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    trustedSources: e.target.value.split("\n").filter((s) => s),
                  });
                  setSaved(false);
                }}
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSave}
            size="lg"
            className="flex items-center gap-2"
          >
            <FiSave size={20} />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

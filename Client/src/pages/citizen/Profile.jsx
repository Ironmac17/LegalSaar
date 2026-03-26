import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLogOut, FiEdit } from "react-icons/fi";
import Button from "../../components/Button";
import { t } from "../../utils/i18n";

export default function Profile() {
  const { user, setUser, language } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{t("pleaseLoginToViewProfile", language)}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("myProfile", language)}</h1>
          <p className="text-gray-600">{t("manageAccountInfo", language)}</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Avatar */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl mb-4">
              👤
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.name || "Citizen"}
            </h2>
          </div>

          {/* Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FiPhone className="text-primary-600 flex-shrink-0" size={24} />
              <div className="flex-grow">
                <p className="text-gray-600 text-sm">{t("phoneNumber", language)}</p>
                <p className="text-gray-900 font-semibold">
                  {user.phone || t("notProvided", language)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FiMail className="text-primary-600 flex-shrink-0" size={24} />
              <div className="flex-grow">
                <p className="text-gray-600 text-sm">{t("email", language)}</p>
                <p className="text-gray-900 font-semibold">
                  {user.email || t("notProvided", language)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FiUser className="text-primary-600 flex-shrink-0" size={24} />
              <div className="flex-grow">
                <p className="text-gray-600 text-sm">{t("accountStatus", language)}</p>
                <p className="text-gray-900 font-semibold">
                  {t("active", language)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <FiEdit size={20} />
              {t("editProfile", language)}
            </Button>
            <Button
              variant="danger"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <FiLogOut size={20} />
              {t("logout", language)}
            </Button>
          </div>
        </div>

        {/* Activity Card */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {t("recentActivity", language)}
          </h3>
          <div className="text-center text-gray-600">
            <p>{t("noRecentActivity", language)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

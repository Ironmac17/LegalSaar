/**
 * Comprehensive validation utilities for the LegalSaas platform
 */

const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validate phone number (10 digits for India)
 */
const validatePhone = (phone) => {
    if (!phone) return { valid: false, error: "Phone number is required" };
    if (typeof phone !== "string") return { valid: false, error: "Phone must be a string" };
    if (!phoneRegex.test(phone)) {
        return { valid: false, error: "Phone must be exactly 10 digits" };
    }
    return { valid: true };
};

/**
 * Validate email format
 */
const validateEmail = (email) => {
    if (!email) return { valid: false, error: "Email is required" };
    if (typeof email !== "string") return { valid: false, error: "Email must be a string" };
    const trimmed = email.toLowerCase().trim();
    if (!emailRegex.test(trimmed)) {
        return { valid: false, error: "Invalid email format" };
    }
    return { valid: true, value: trimmed };
};

/**
 * Validate password strength
 * Requirements: min 8 chars, uppercase, lowercase, number, special char
 */
const validatePassword = (password) => {
    if (!password) return { valid: false, error: "Password is required" };
    if (typeof password !== "string") return { valid: false, error: "Password must be a string" };
    if (password.length < 8) {
        return { valid: false, error: "Password must be at least 8 characters" };
    }
    if (!passwordRegex.test(password)) {
        return {
            valid: false,
            error: "Password must contain uppercase, lowercase, number, and special character",
        };
    }
    return { valid: true };
};

/**
 * Validate OTP (6 digits)
 */
const validateOTP = (otp) => {
    if (!otp) return { valid: false, error: "OTP is required" };
    if (typeof otp !== "string") return { valid: false, error: "OTP must be a string" };
    if (!/^\d{6}$/.test(otp)) {
        return { valid: false, error: "OTP must be exactly 6 digits" };
    }
    return { valid: true };
};

/**
 * Validate language code
 */
const validateLanguage = (language) => {
    const supportedLanguages = ["en", "hi", "ta", "te", "kn", "ml", "mr", "gu", "bn", "pa"];
    if (!language) return { valid: false, error: "Language is required" };
    if (!supportedLanguages.includes(language.toLowerCase())) {
        return {
            valid: false,
            error: `Language must be one of: ${supportedLanguages.join(", ")}`,
        };
    }
    return { valid: true, value: language.toLowerCase() };
};

/**
 * Validate role
 */
const validateRole = (role) => {
    const validRoles = ["citizen", "admin", "super_admin"];
    if (!role) return { valid: false, error: "Role is required" };
    if (!validRoles.includes(role)) {
        return { valid: false, error: `Role must be one of: ${validRoles.join(", ")}` };
    }
    return { valid: true };
};

/**
 * Validate file size (in MB)
 */
const validateFileSize = (fileSizeInBytes, maxSizeInMB = 10) => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (fileSizeInBytes > maxSizeInBytes) {
        return {
            valid: false,
            error: `File size must not exceed ${maxSizeInMB}MB`,
        };
    }
    return { valid: true };
};

/**
 * Validate file type
 */
const validateFileType = (mimetype, allowedTypes = ["pdf", "image", "txt"]) => {
    if (!mimetype) return { valid: false, error: "File type is required" };

    let fileType = "";
    if (mimetype === "application/pdf") fileType = "pdf";
    else if (mimetype.startsWith("image")) fileType = "image";
    else if (mimetype === "text/plain") fileType = "txt";
    else fileType = "unsupported";

    if (!allowedTypes.includes(fileType)) {
        return {
            valid: false,
            error: `File type must be one of: ${allowedTypes.join(", ")}`,
        };
    }
    return { valid: true, fileType };
};

/**
 * Validate MongoDB ObjectId
 */
const validateObjectId = (id) => {
    if (!id) return { valid: false, error: "ID is required" };
    if (!/^[0-9a-f]{24}$/.test(id)) {
        return { valid: false, error: "Invalid ID format" };
    }
    return { valid: true };
};

/**
 * Validate string field (non-empty, max length)
 */
const validateString = (value, fieldName, minLength = 1, maxLength = 500) => {
    if (!value) return { valid: false, error: `${fieldName} is required` };
    if (typeof value !== "string") {
        return { valid: false, error: `${fieldName} must be a string` };
    }
    const trimmed = value.trim();
    if (trimmed.length < minLength) {
        return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
    }
    if (trimmed.length > maxLength) {
        return { valid: false, error: `${fieldName} must not exceed ${maxLength} characters` };
    }
    return { valid: true, value: trimmed };
};

/**
 * Validate number field
 */
const validateNumber = (value, fieldName, min = 0, max = Infinity) => {
    if (value === null || value === undefined) {
        return { valid: false, error: `${fieldName} is required` };
    }
    if (typeof value !== "number" && isNaN(Number(value))) {
        return { valid: false, error: `${fieldName} must be a number` };
    }
    const num = Number(value);
    if (num < min || num > max) {
        return {
            valid: false,
            error: `${fieldName} must be between ${min} and ${max}`,
        };
    }
    return { valid: true, value: num };
};

/**
 * Validate array field
 */
const validateArray = (value, fieldName, minLength = 0, maxLength = 1000) => {
    if (!Array.isArray(value)) {
        return { valid: false, error: `${fieldName} must be an array` };
    }
    if (value.length < minLength) {
        return { valid: false, error: `${fieldName} must have at least ${minLength} items` };
    }
    if (value.length > maxLength) {
        return { valid: false, error: `${fieldName} must not exceed ${maxLength} items` };
    }
    return { valid: true };
};

module.exports = {
    validatePhone,
    validateEmail,
    validatePassword,
    validateOTP,
    validateLanguage,
    validateRole,
    validateFileSize,
    validateFileType,
    validateObjectId,
    validateString,
    validateNumber,
    validateArray,
};

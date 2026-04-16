const otpStore = new Map();
const OTP_EXPIRY_MS = 2 * 60 * 1000; // 2 minutes

const sendOTP = async (phone) => {
  // Generate a random 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP with an expiry time
  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS
  });
  
  console.log(`[OTP Demo] OTP for ${phone} is: ${otp}`);
  return otp; // Return it so we can send it in the dev environment for the UI
};

const verifyOTP = (phone, otp) => {
  const storeData = otpStore.get(phone);
  
  if (!storeData) return false;
  
  // Check Expiry
  if (Date.now() > storeData.expiresAt) {
    otpStore.delete(phone);
    return false; // expired
  }
  
  if (storeData.otp === otp) {
    otpStore.delete(phone); // clear OTP after successful use
    return true;
  }
  
  return false;
};

module.exports = { sendOTP, verifyOTP };

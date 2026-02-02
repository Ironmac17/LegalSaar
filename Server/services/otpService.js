const otpStore = new Map();

const sendOTP = (phone) => {
  const otp = "123456";
  otpStore.set(phone, otp);
};

const verifyOTP = (phone, otp) => {
  const storedOtp = otpStore.get(phone);
  return storedOtp === otp;
};

module.exports = { sendOTP, verifyOTP };

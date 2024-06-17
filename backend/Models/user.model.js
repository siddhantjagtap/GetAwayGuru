const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const Userdetail = mongoose.model("Userdetail", userSchema);
module.exports = Userdetail;

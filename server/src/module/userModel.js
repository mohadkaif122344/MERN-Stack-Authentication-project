import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      default: "",
    },
    removeImagePublicId: {
    type: String,
    default: "",
    },
    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },
    googleId: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpireAt: {
      type: Number,
      default: 0,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

//Password hash before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

if(!this.password){
    return;
}
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {

    if(!this.password){
        return false;
        }
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

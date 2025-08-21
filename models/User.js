import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  tier: {
    type: String,
    enum: ["Basic", "Standard", "Premium"],
    default: "Basic",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "expired"],
    default: "inactive",
  },
  startDate: Date,
  endDate: Date,
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    idNumber: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    subscription: subscriptionSchema,

    // 🔑 Password Reset
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    region: { type: String },
    hobbies: { type: String },
    favoriteCountry: [String],
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

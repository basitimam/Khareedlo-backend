const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // type: {
    //     type: String
    // },
    // categoryImage: {
    //     type: String },
    //     Id: {
    //         type: String
    //     }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);

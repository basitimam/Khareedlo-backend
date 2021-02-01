const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    featured: { type: Boolean, default: false },
    imagePath: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    expiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

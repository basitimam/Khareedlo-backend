const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 40,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    phonenumber: {
      type: String,
      required: true,
      min: 11,
      max: 14,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    address: {
      streetaddress: {
        type: String,
        required: true,
        lowercase: true,
        min: 10,
      },
      city: {
        type: String,
        required: true,
        lowercase: true,
        min: 3,
        max: 20,
      },
      province: {
        type: String,
        required: true,
        lowercase: true,
        min: 2,
        max: 20,
      },
      country: {
        type: String,
        required: true,
        lowercase: true,
        min: 3,
        max: 20,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    // pofilePicture: { type: String },
  },
  { timestamps: true }
);

// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

module.exports = mongoose.model("User", userSchema);

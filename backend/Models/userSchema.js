const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "add a user name"],
    },
    email: {
      type: String,
      required: [true, "add a user email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "add a user password"],
    },
    phone: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);

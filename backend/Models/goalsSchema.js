const mongoose = require("mongoose");

const goalsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AllGoals", goalsSchema);

const mongoose = require("mongoose");

const ResourceSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    state: {
      type: String,
      required: [true, "avalaible/not avalaible"],
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resources", ResourceSchema);

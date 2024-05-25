const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the name of the course"],
    },
    descripion: {
      type: String,
      required: [true, "Please add the Description"],
    },
    credits: {
      type: String,
      required: [true, "Please add the number of Credits"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);

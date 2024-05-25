const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ClassName: {
      type: String,
      required: [true, "Please add the name of the Monday"],
    },
    State: {
      type: String,
      required: [true, "Please add the Description"],
    },
    Capacity: {
      type: String,
      required: [true, "Please add the number of Credits"],
    },
    Facilities: {
        type: String,
        required: [true, "Please add the name of the course"],
      },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Classroom", ClassSchema);

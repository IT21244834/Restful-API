const mongoose = require("mongoose");

const TimetableSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    course: {
      type: String,
      required: [true, "Please add the name of the Monday"],
    },

    time: {
      type: String,
      required: [true, "Please add the name of the Monday"],
    },

    faculty: {
      type: String,
      required: [true, "Please add the name of the Monday"],
    },

    location: {
      type: String,
      required: [true, "Please add the name of the Monday"],
    },

    Monday: {
      type: String,
      required: [true, "Please add the name of the Monday"],
    },
    Tuesday: {
      type: String,
      required: [true, "Please add the Description"],
    },
    Wednesday: {
      type: String,
      required: [true, "Please add the number of Credits"],
    },
    Thursday: {
        type: String,
        required: [true, "Please add the name of the course"],
      },
      Friday: {
        type: String,
        required: [true, "Please add the Description"],
      },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Timetable", TimetableSchema);

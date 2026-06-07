const mongoose = require("mongoose");

const plannerSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      targetDate: {
        type: Date,
        required: true,
      },

      progress: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "In Progress",
          "Completed",
        ],
        default: "Pending",
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Planner",
  plannerSchema
);
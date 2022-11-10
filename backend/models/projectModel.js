const Mongoose = require("mongoose");

const projectSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports= Mongoose.model('Project',projectSchema)

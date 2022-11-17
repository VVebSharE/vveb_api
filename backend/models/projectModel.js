const Mongoose = require("mongoose");

const projectSchema = Mongoose.Schema(
  {
    user:{
      type:Mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User',
    },
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

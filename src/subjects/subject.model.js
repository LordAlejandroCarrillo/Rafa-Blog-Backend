import { Schema, model } from "mongoose";

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The title of the publication is required."],
      maxLength: [50, "Cant be overcome 50 characters."],
      minLength: [5, "At least 5 characters."],
      unique: true,
    },
    imageURL:{
      type: String
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model("Subject", SubjectSchema)

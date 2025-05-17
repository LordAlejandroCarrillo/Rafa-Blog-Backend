import { Schema, model } from "mongoose";

const PublicationSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title of the publication is required."],
      maxLength: [100, "Cant be overcome 100 characters."],
      minLength: [5, "At least 5 characters."]
    },
    description: {
      type: String,
      required: [true, "The description of the publication is required."],
      maxLength: [2000, "Cant be overcome 2000 characters."],
      minLength: [20, "At least 20 characters."]
    },
    subjectRef: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "The subject is required."],
    },
    categoryRef: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    subjectName: {
      type: String
    },
    date: {
      type: String 
    },
    lastUpdateDate: {
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

export default model("Publication", PublicationSchema)
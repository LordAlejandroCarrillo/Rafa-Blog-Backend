import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "The username is required."],
      maxLength: [50, "Cant be overcome 50 characers."],
      minLength: [3, "At least 3 characters."]
    },
    text: {
      type: String,
      required: [true, "The text is required."],
      maxLength: [1500, "Cant be overcome 1500 characters."],
      minLength: [5, "At least 5 characters."]
    },
    publicationRef: {
      type: Schema.Types.ObjectId,
      ref: "Publication",
      required: [true, "The publication is required."]
    },
    date: {
        type: String
    },
    state: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model("Comment", CommentSchema)

import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required."],
      maxLength: [22, "Cant be overcome 22 characers."], 
      minLength: [5, "At least 3 characters."]
    },
    color:{
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

export default model("Category", CategorySchema)

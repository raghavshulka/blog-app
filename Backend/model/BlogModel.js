import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    description: { 
      type: String,
      required: [true, "Please enter a description"],
    },
    content: {
      type: String,
      required: [true, "Please enter the content"],
    },
    author: {
      type: String,
      required: [true, "Please enter the author's name"],
    },
    slug: {
      type: String,
      required: [true, "Please enter a slug"],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

// Correct export statement
const BlogSchema = mongoose.model("Blogs", schema);
export default BlogSchema;

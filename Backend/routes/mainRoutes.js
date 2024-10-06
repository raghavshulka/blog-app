import express from "express";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../controller/todoController.js";

const app = express.Router();

app.post("/new", createBlog);

app.delete('/del/:id', deleteBlog);
app.put('/update/:id', updateBlog);
app.get('/get', getBlogs);
app.get('/get/:id', getBlogById); 



export default app;
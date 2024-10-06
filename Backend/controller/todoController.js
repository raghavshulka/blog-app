import BlogModel from '../model/BlogModel.js'


//create
export const createBlog = async (req, res) => {
  try {
    const { title, description, content, author, slug, imageUrl } = req.body;

    if (!title || !content || !author || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title, content, author, and slug are required",
      });
    }

    const blog = await BlogModel.create({
      title,
      description,
      content,
      author,
      slug,
      imageUrl,
    });

    return res.status(200).json({
      success: true,
      message: `Blog post created: ${blog.title}`,
      data: blog,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Blog post creation failed",
    });
  }
};



//delete
export const deleteBlog = async (req, res) => {
  try {
    const result = await BlogModel.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Blog post deleted successfully: ${result.title}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Blog post deletion failed",
      error: err.message,
    });
  }
};

//update
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, author, slug, imageUrl } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog post ID is required",
      });
    }

    const blogToUpdate = await BlogModel.findById(id);

    if (!blogToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Update fields if provided
    if (title) blogToUpdate.title = title;
    if (description) blogToUpdate.description = description;
    if (content) blogToUpdate.content = content;
    if (author) blogToUpdate.author = author;
    if (slug) blogToUpdate.slug = slug;
    if (imageUrl) blogToUpdate.imageUrl = imageUrl;

    await blogToUpdate.save();

    return res.status(200).json({
      success: true,
      message: `Blog post updated successfully: ${blogToUpdate.title}`,
      data: blogToUpdate,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Blog post updating failed",
      error: err.message,
    });
  }
};


//get all
export const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();

    return res.status(200).json({
      success: true,
      message: "Blog posts found",
      blogs,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve blog posts",
    });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog post ID is required",
      });
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog post retrieved successfully",
      data: blog,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve blog post",
      error: err.message,
    });
  }
};

"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "./Axiosinstance";
import { Edit2, Trash2, Plus, Loader, X } from "lucide-react";
import { Link } from "react-router-dom";
const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get("/get");
      setBlogs(
        Array.isArray(response.data.blogs)
          ? response.data.blogs
          : [response.data]
      );
      console.log(response.data.blogs);
    } catch (err) {
      setError("Error fetching blogs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axiosInstance.delete(`/del/${id}`);
        fetchBlogs();
      } catch (err) {
        console.error("Error deleting blog:", err);
      }
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/update/${editingBlog._id}`, editingBlog);
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Blog Dashboard
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/createPage"
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <Plus size={18} />
                  <span>Create Blog</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Discover Our Latest Blogs
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-purple-500" size={48} />
          </div>
        ) : error ? (
          <div className="text-red-400 text-center text-lg">{error}</div>
        ) : blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                  />
                </div>
                <div className="p-6">
                <Link to={`/blog/${blog._id}`}>
                  <h3 className="font-bold text-xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    {blog.title}
                  </h3>
                  </Link>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <p>By: {blog.author}</p>
                    <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                      aria-label="Edit blog"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                      aria-label="Delete blog"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg">
            No blogs found.
          </div>
        )}
      </main>

      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Edit Blog
              </h3>
              <button
                onClick={() => setEditingBlog(null)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close edit form"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editingBlog.title}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, title: e.target.value })
                }
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Title"
              />
              <textarea
                value={editingBlog.description}
                onChange={(e) =>
                  setEditingBlog({
                    ...editingBlog,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Description"
                rows={4}
              ></textarea>
              <input
                type="text"
                value={editingBlog.author}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, author: e.target.value })
                }
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Author"
              />
              <input
                type="text"
                value={editingBlog.imageUrl}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, imageUrl: e.target.value })
                }
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Image URL"
              />
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;

"use client";

import React, { useState } from "react";
import { Pen, FileText, User, Hash, Image as ImageIcon } from "lucide-react";
import axiosInstance from "./Axiosinstance.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

const CreateBlog = () => {

  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    slug: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/new", formData);
      // Handle successful blog creation (e.g., show a success message or redirect)
      console.log("Blog created successfully");

      setFormData({
        title: "",
        description: "",
        content: "",
        author: "",
        slug: "",
        imageUrl: "",
      });

      //home page go back 
      navigate("/"); // Redirect to the homepage or desired route

    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-300 hover:text-teal-400 transition">
              <ArrowLeft className="w-5 h-5 mr-2" /> {/* Go Back Icon */}
              Go Back
            </button>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-8">
            Create Your Masterpiece
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className=" text-sm font-medium text-gray-300 flex items-center"
              >
                <Pen className="w-5 h-5 mr-2 text-teal-400" />
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Enter your blog title"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className=" text-sm font-medium text-gray-300 flex items-center"
              >
                <FileText className="w-5 h-5 mr-2 text-blue-400" />
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Write a brief description"
                required
              ></textarea>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="content"
                className=" text-sm font-medium text-gray-300 flex items-center"
              >
                <FileText className="w-5 h-5 mr-2 text-purple-400" />
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="6"
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Write your blog content here"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="author"
                  className=" text-sm font-medium text-gray-300 flex items-center"
                >
                  <User className="w-5 h-5 mr-2 text-pink-400" />
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="slug"
                  className=" text-sm font-medium text-gray-300 flex items-center"
                >
                  <Hash className="w-5 h-5 mr-2 text-yellow-400" />
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="your-blog-slug"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="imageUrl"
                className=" text-sm font-medium text-gray-300 flex items-center"
              >
                <ImageIcon className="w-5 h-5 mr-2 text-green-400" />
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all"
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

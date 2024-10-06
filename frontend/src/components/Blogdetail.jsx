import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "./Axiosinstance";
import { ArrowLeft, Loader, Calendar, User } from "lucide-react"
const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/get/${id}`);
        setBlog(response.data.data);
        console.log(response.data.data)
      } catch (err) {
        setError("Error fetching blog details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Loader className="animate-spin text-purple-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-red-400 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-lg font-semibold">Back to Blogs</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {blog && (
          <article className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
            <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
            </div>
            <div className="p-8 md:p-12 lg:p-16 -mt-20 relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center justify-start text-sm text-gray-400 mb-8 space-x-6">
                <p className="flex items-center space-x-2">
                  <User size={18} />
                  <span>{blog.author}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </p>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 text-xl leading-relaxed mb-8">
                  {blog.description}
                </p>
                <div className="mt-12 space-y-8">
                  {blog.content && blog.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default BlogDetail;
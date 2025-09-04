import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import "./Blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="blog-container">
      <h2>All Blogs</h2>
      {blogs.length > 0 ? (
        <div className="blog-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default Blog;
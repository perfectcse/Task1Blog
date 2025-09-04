import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      {/* Blog Image */}
      {blog.image && (
        <img className="blog-image" src={blog.image} alt={blog.title} />
      )}

      {/* Blog Content */}
      <div className="blog-content">
        <h3>{blog.title}</h3>
        <p>
          {blog.content.length > 150
            ? blog.content.substring(0, 150) + "..."
            : blog.content}
        </p>
        <p className="author">By {blog.author || "Unknown"}</p>

        {/* Read More Button */}
        <Link to={`/blogs/${blog._id}`} className="read-more-btn">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
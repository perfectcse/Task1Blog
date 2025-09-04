import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams(); // get blog id from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) throw new Error("Blog not found");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading blog...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="blog-details-container">
      {blog ? (
        <div className="blog-details">
          {blog.image && <img src={blog.image} alt={blog.title} />}
          <h1>{blog.title}</h1>
          <p className="blog-author">By {blog.author || "Unknown"}</p>
          <p className="blog-content">{blog.content}</p>

          <Link to="/blogs" className="back-btn">← Back to Blogs</Link>
        </div>
      ) : (
        <p>No blog found.</p>
      )}
    </div>
  );
};

export default BlogDetails;
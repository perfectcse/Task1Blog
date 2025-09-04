import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Blog.css"; // reuse same styles for form

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = { title, content, author, image };

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });

      if (res.ok) {
        alert("Blog added successfully ✅");
        navigate("/blogs");
      } else {
        const err = await res.json();
        alert("Error: " + err.error);
      }
    } catch (err) {
      console.error("Error adding blog:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your content..."
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminBlogForm = () => {
  const { id } = useParams(); // if editing, get post id
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch post if editing
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to load post");
          return;
        }

        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Server error while fetching post.");
      }
    };

    fetchPost();
  }, [id]);

  // ✅ Handle submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:5000/api/posts/${id}`
        : "http://localhost:5000/api/posts";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save blog");
        return;
      }

      navigate("/admin/dashboard"); // redirect after success
    } catch (err) {
      console.error("Error saving post:", err);
      setError("Server error while saving post.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>{id ? "✏️ Edit Blog" : "➕ Create New Blog"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#2d6a4f",
            color: "white",
            padding: "10px",
            border: "none",
            width: "100%",
            cursor: "pointer",
          }}
        >
          {id ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AdminBlogForm;
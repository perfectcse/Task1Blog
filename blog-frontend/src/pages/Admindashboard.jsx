import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      if (res.ok) {
        setPosts(data);
      } else {
        setError(data.error || "Failed to fetch posts");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("Server error while fetching posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ Create new post
  const handleCreatePost = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Backend Error:", data);
        setError(data.error || "Error creating post");
        return;
      }

      // ✅ Reset form & refresh posts
      setTitle("");
      setContent("");
      setError("");
      fetchPosts();
    } catch (err) {
      console.error("❌ Network Error:", err);
      setError("Server error. Try again later.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Admin Dashboard</h2>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          background: "brown",
          color: "white",
          padding: "5px 10px",
          marginBottom: "20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      {/* Create Post */}
      <h3>Create Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          width: "100%",
          padding: "8px",
        }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          width: "100%",
          height: "100px",
          padding: "8px",
        }}
      />
      <button
        onClick={handleCreatePost}
        style={{
          background: "#2d6a4f",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Create Post
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show all posts */}
      <h3>All Posts</h3>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post._id}>
              <strong>{post.title}</strong> - {post.content}
            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
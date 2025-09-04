import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// ✅ Components
import Footer from "./components/Footer";

// ✅ Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import NewBlog from "./pages/NewBlog";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/Adminlogin";
import AdminDashboard from "./pages/Admindashboard";
import AdminBlogForm from "./pages/AdminblogForm";

// ✅ Simple NotFound page
const NotFound = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h2>404 — Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <Router>
      {/* Navbar */}
      <header
        style={{
          background: "#2d6a4f",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        <nav>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", marginRight: "1rem" }}>
            Home
          </Link>
          <Link to="/about" style={{ color: "#fff", textDecoration: "none", marginRight: "1rem" }}>
            About
          </Link>
          <Link to="/blogs" style={{ color: "#fff", textDecoration: "none", marginRight: "1rem" }}>
            Blogs
          </Link>
          <Link to="/contact" style={{ color: "#fff", textDecoration: "none", marginRight: "1rem" }}>
            Contact
          </Link>
          <Link to="/admin/login" style={{ color: "#fff", textDecoration: "none" }}>
            Admin
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main style={{ minHeight: "calc(100vh - 160px)" }}>
        <Routes>
          {/* User Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/new" element={<NewBlog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blogform" element={<AdminBlogForm />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
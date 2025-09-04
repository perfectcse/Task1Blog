import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My Blog Site</h1>
      <p>Read the latest blogs or share your own thoughts.</p>
      <Link to="/blogs">Go to Blogs</Link>
    </div>
  );
};

export default Home;
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Our Blog</h1>
        <p>
          Welcome to <strong>My Blog Site</strong> — a place where ideas,
          stories, and knowledge are shared with the world. Our mission is to
          provide engaging and insightful content across various topics,
          including technology, lifestyle, education, and personal growth.
        </p>

        <p>
          This platform is built with the MERN stack (MongoDB, Express, React,
          Node.js). It allows users to create, read, and explore blogs
          seamlessly with a simple and clean design.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>✍️ Create your own blogs and share your thoughts.</li>
          <li>📖 Explore posts written by different authors.</li>
          <li>📰 Stay updated with the latest blogs on trending topics.</li>
          <li>👨‍💻 A clean, responsive design for better user experience.</li>
        </ul>

        <h2>Our Vision</h2>
        <p>
          We believe in the power of storytelling and sharing knowledge. Blogs
          connect people, spark conversations, and inspire change. Through this
          platform, we aim to build a community of passionate readers and
          writers.
        </p>

        <p className="about-footer">
          Thank you for being part of our journey! 🚀
        </p>
      </div>
    </div>
  );
};

export default About;
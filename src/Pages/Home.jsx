import React, { useState } from "react";
import { NavLink } from "react-router";
import { useFirebase } from "../Context/Firebase";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Home = () => {
  const { posts, updatePostVotes ,searchQuery} = useFirebase();

  return (
    <div className="container">
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-content">
          <h1>Share Your Thoughts</h1>
          <p>Join our community and share your ideas, experiences, and stories with people around the world.</p>
          <NavLink to="/createPost" className="create-post-btn">
            Create New Post
          </NavLink>
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts-container">
        <h2>Recent Posts</h2>
        <div className="posts-grid">
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts available yet. Be the first to share!</p>
            </div>
          ) : (
            posts.slice().reverse().map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-content">{post.content}</p>

                {/* Upvote & Downvote Section */}
                <div className="vote-buttons">
                  <button
                    className="vote-btn upvote"
                    onClick={() => updatePostVotes(post.id, "upvote")}
                  >
                    <FaThumbsUp /> {post.upvotes || 0}
                  </button>

                  <button
                    className="vote-btn downvote"
                    onClick={() => updatePostVotes(post.id, "downvote")}
                  >
                    <FaThumbsDown /> {post.downvotes || 0}
                  </button>
                </div>

                <div className="post-footer">
                  <span className="category-tag">{post.category}</span>
                  <span className="author">Posted by {post.userEmail}</span>
                </div>
              </div>
            ))
          )}
        </div>
        </div>

      <style>{`
        /* Global Styles */
        .container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        /* Banner Styles */
        .banner {
          background: linear-gradient(-45deg, #4f46e5, #3b82f6, #0ea5e9, #4f46e5);
          background-size: 400% 400%;
          color: white;
          padding: 60px 20px;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
          animation: gradient 15s ease infinite;
        }

        .banner-content {
          max-width: 1200px;
          margin: 0 auto;
          animation: slideDown 0.8s ease-out;
        }

        .banner h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .banner p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          animation: fadeIn 1s ease-out;
        }

        .create-post-btn {
          display: inline-block;
          padding: 12px 24px;
          background-color: white;
          color: #3b82f6;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: transform 0.2s;
          animation: bounceSoft 2s infinite;
        }

        .create-post-btn:hover {
          transform: scale(1.05);
        }

        /* Posts Section Styles */
        .posts-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .posts-container h2 {
          font-size: 2rem;
          margin-bottom: 30px;
          color: #333;
        }

        .posts-grid {
          display: grid;
          gap: 20px;
        }

        .no-posts {
          text-align: center;
          padding: 48px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          animation: fadeIn 1s ease-out;
        }

        .post-card {
          background: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          animation: slideUp 0.5s ease-out;
        }

        .post-card:hover {
          transform: translateY(-4px);
        }

        .post-card h3 {
          font-size: 1.25rem;
          margin-bottom: 12px;
          color: #333;
        }

        .post-content {
          color: #666;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }

        .category-tag {
          background-color: #8dcd8d;
          color: #0369a1;
          padding: 4px 12px;
          margin-top: 14px;
          border-radius: 8px;
          font-size: 1.1rem;
          font:bold;
        }

        .author {
          color: #666;
          font-style: italic;
        }

        .vote-section {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .vote-buttons{
        display: flex;
        gap: 25px;
        }

        .vote-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .thumb-icon {
          font-size: 1.2rem;
        }

        .upvote {
          color: green;
        }

        .downvote {
          color: red;
        }

        /* Animations */
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bounceSoft {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .banner h1 {
            font-size: 2rem;
          }

          .banner p {
            font-size: 1rem;
          }

          .post-footer {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

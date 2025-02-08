import React from 'react';
import { useFirebase } from '../Context/Firebase';

const Community = () => {
  const { posts } = useFirebase();

  return (
    <div className="community-container">
      <div className="header-section">
        <h2>Community Discussions</h2>
        <p>Join discussions, share thoughts, and connect with others.</p>
      </div>

      <div className="posts-section">
        <h3>Recent Posts</h3>
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No discussions yet.</p>
            <p>Be the first to start a conversation!</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.slice().reverse().map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <div className="post-footer">
                  <p className="author">By: {post.userEmail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .community-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          animation: fadeIn 0.5s ease-out;
        }

        .header-section {
          text-align: center;
          margin-bottom: 50px;
          animation: slideDown 0.7s ease-out;
        }

        .header-section h2 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .header-section p {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .posts-section {
          animation: slideUp 0.7s ease-out;
        }

        .posts-section h3 {
          font-size: 1.8rem;
          color: #2c3e50;
          margin-bottom: 30px;
        }

        .no-posts {
          text-align: center;
          padding: 40px;
          background: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .no-posts p {
          color: #666;
          margin: 10px 0;
        }

        .no-posts p:first-child {
          font-size: 1.2rem;
          color: #2c3e50;
        }

        .posts-grid {
          display: grid;
          gap: 25px;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        .post-card {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .post-card h3 {
          font-size: 1.4rem;
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .post-content {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .post-footer {
          border-top: 1px solid #eee;
          padding-top: 15px;
          margin-top: auto;
        }

        .author {
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .community-container {
            padding: 20px;
          }

          .header-section h2 {
            font-size: 2rem;
          }

          .header-section p {
            font-size: 1rem;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }

          .post-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Community;
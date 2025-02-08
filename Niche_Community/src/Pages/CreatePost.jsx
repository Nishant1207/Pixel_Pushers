import React, { useState } from "react";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const { createPost, isLoggedIn } = useFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }
    if (!isLoggedIn) {
      alert("You need to be logged in to post.");
      return;
    }
    try {
      await createPost(title, content, category);
      alert("Post created successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="create-post-wrapper">
      <div className="create-post-container">
        <h2>Create a Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Write an interesting title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Tech">Tech</option>
              <option value="Cricket">Cricket</option>
              <option value="Hobbies">Hobbies</option>
            </select>
          </div>

          <button type="submit">Create Post</button>
        </form>
      </div>

      <style>{`
        .create-post-wrapper {
          min-height: 100vh;
          padding: 40px 20px;
          background: #f5f7fa;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .create-post-container {
          width: 100%;
          max-width: 550px;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          animation: fadeIn 0.4s ease-out;
        }

        h2 {
          color: #1a1a1a;
          font-size: 1.75rem;
          margin-bottom: 25px;
          text-align: center;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          color: #4a4a4a;
          font-size: 0.95rem;
          font-weight: 500;
        }

        input, textarea, select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e4e8;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          background: #fafbfc;
        }

        input:hover, textarea:hover, select:hover {
          border-color: #d0d7de;
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #2563eb;
          background: white;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        textarea {
          min-height: 150px;
          resize: vertical;
          line-height: 1.5;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 14px;
          padding-right: 40px;
        }

        button {
          width: 100%;
          padding: 12px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 10px;
        }

        button:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        button:active {
          transform: translateY(0);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Placeholder styles */
        ::placeholder {
          color: #a0aec0;
        }

        /* Error state */
        input:invalid:not(:placeholder-shown),
        textarea:invalid:not(:placeholder-shown) {
          border-color: #dc2626;
        }

        @media (max-width: 640px) {
          .create-post-container {
            padding: 20px;
          }

          h2 {
            font-size: 1.5rem;
            margin-bottom: 20px;
          }

          input, textarea, select, button {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default CreatePost;
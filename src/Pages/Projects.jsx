import React from 'react';
import { useFirebase } from '../Context/Firebase';

const Projects = () => {
  const { posts } = useFirebase();
  const projectPosts = posts.filter((post) => post.category === "Project");

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>Community Projects</h2>
        <p>Explore projects created by our community members.</p>
      </div>

      <div className="projects-grid">
        {projectPosts.length === 0 ? (
          <div className="no-projects">
            <p>No projects found.</p>
          </div>
        ) : (
          projectPosts.map((post, index) => (
            <div key={post.id} className="project-card" style={{"--delay": `${index * 0.1}s`}}>
              <h3>{post.title}</h3>
              <p className="project-content">{post.content}</p>
              <p className="project-author">By: {post.userEmail}</p>
            </div>
          ))
        )}
      </div>

      <style>{`
        .projects-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          animation: fadeIn 0.8s ease-out;
        }

        .projects-header {
          text-align: center;
          margin-bottom: 50px;
          animation: slideDown 0.8s ease-out;
        }

        .projects-header h2 {
          font-size: 2.5em;
          color: #333;
          margin-bottom: 15px;
          position: relative;
        }

        .projects-header h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: #4a90e2;
          animation: expandWidth 0.8s ease-out;
        }

        .projects-header p {
          color: #666;
          font-size: 1.2em;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          padding: 20px 0;
        }

        .project-card {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: slideUp 0.5s ease-out forwards;
          animation-delay: var(--delay);
          opacity: 0;
        }

        .project-card:hover {
          transform: translateY(-5px) rotate(1deg);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .project-card h3 {
          color: #333;
          font-size: 1.4em;
          margin-bottom: 15px;
          position: relative;
          padding-bottom: 10px;
        }

        .project-card h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: #4a90e2;
          transition: width 0.3s ease;
        }

        .project-card:hover h3::after {
          width: 100%;
        }

        .project-content {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .project-author {
          color: #888;
          font-style: italic;
          font-size: 0.9em;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }

        .no-projects {
          text-align: center;
          padding: 50px;
          background: #f8f9fa;
          border-radius: 10px;
          grid-column: 1 / -1;
          animation: pulse 2s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 60px;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .projects-container {
            padding: 20px;
          }

          .projects-header h2 {
            font-size: 2em;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
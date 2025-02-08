import React from 'react';

const Events = () => {
  const events = [
    { id: 1, name: "Hackathon 2025", date: "March 10, 2025", location: "Online" },
    { id: 2, name: "ReactJS Workshop", date: "March 25, 2025", location: "New York" },
  ];

  return (
    <div className="events-wrapper">
      <div className="events-container">
        <div className="events-header">
          <h2>Upcoming Events</h2>
          <p>Stay updated with community events and meetups.</p>
        </div>

        <div className="events-grid">
          {events.length === 0 ? (
            <div className="no-events">
              <p>No events scheduled.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <div 
                key={event.id} 
                className="event-card"
                style={{"--delay": `${index * 0.2}s`}}
              >
                <div className="event-content">
                  <h3>{event.name}</h3>
                  <div className="event-details">
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                  </div>
                  <button className="register-btn">Register</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .events-wrapper {
          min-height: 100vh;
          background: #f5f7fa;
          padding: 40px 20px;
        }

        .events-container {
          max-width: 1000px;
          margin: 0 auto;
          animation: fadeIn 0.6s ease-out;
        }

        .events-header {
          text-align: center;
          margin-bottom: 40px;
          animation: slideDown 0.8s ease-out;
        }

        .events-header h2 {
          font-size: 2.5em;
          color: #2d3748;
          margin-bottom: 15px;
          position: relative;
          display: inline-block;
        }

        .events-header h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #4299e1, #667eea);
          animation: expandWidth 1s ease-out;
        }

        .events-header p {
          color: #4a5568;
          font-size: 1.1em;
        }

        .events-grid {
          display: grid;
          gap: 25px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .event-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          opacity: 0;
          animation: slideUp 0.5s ease-out forwards;
          animation-delay: var(--delay);
          position: relative;
        }

        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #4299e1, #667eea);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .event-card:hover::before {
          transform: scaleX(1);
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .event-content {
          padding: 25px;
        }

        .event-card h3 {
          color: #2d3748;
          font-size: 1.3em;
          margin-bottom: 15px;
        }

        .event-details {
          margin-bottom: 20px;
        }

        .event-details p {
          color: #4a5568;
          margin: 8px 0;
        }

        .register-btn {
          background: linear-gradient(90deg, #4299e1, #667eea);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 1em;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
        }

        .no-events {
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 12px;
          grid-column: 1 / -1;
          animation: pulse 2s infinite;
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

        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }

        @media (max-width: 768px) {
          .events-wrapper {
            padding: 20px;
          }

          .events-header h2 {
            font-size: 2em;
          }

          .events-grid {
            grid-template-columns: 1fr;
          }

          .event-card {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Events;
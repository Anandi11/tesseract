import React from "react";
import { useNavigate } from "react-router-dom";
import icon from "./icon.jpg";
export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          background-image: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
          min-height: 100vh;
          color: #333;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          background-color: rgba(255,255,255,0.8);
          backdrop-filter: blur(5px);
          border-radius: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 20px;
          color: #1a202c;
        }
        .logo-text {
          font-size: 3.2rem; 
          text-align: center;  
          font-weight: 800;        
          color: #1a202c; 
          line-height: 1.2;
        }

        .header-icon {
            height: 4rem;
            width: 4rem;
            /* color: #4f46e5; */
            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
        }

        .nav-center a {
          margin: 0 20px;
          text-decoration: none;
          color: #4a5568;
          font-weight: 500;
        }

        .nav-center a:hover { color: #4f46e5; }

        .nav-right { display: flex; align-items: center; }

        .signin {
          margin-right: 15px;
          text-decoration: none;
          color: #4a5568;
          font-weight: 500;
        }

        .signin:hover { color: #4f46e5; }

        .get-started {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .get-started:hover { transform: scale(1.05); background-color: #4338ca; }

        .hero {
          text-align: center;
          padding: 100px 20px;
        }

        .hero-content { max-width: 800px; margin: auto; }

        .badge {
          display: inline-block;
          background-color: rgba(255,255,255,0.7);
          color: #1a202c;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin: 10px 0;
          line-height: 1.2;
          color: #1a202c;
        }

        .hero-subtext {
          font-size: 1.1rem;
          color: #4a5568;
          margin: 20px 0 40px;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .primary-btn {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 14px 26px;
          font-size: 1rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .primary-btn:hover { transform: scale(1.05); background-color: #4338ca; }

        .secondary-btn {
          background-color: white;
          border: 1px solid #4f46e5;
          color: #4f46e5;
          padding: 14px 26px;
          font-size: 1rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .secondary-btn:hover {
          background-color: #4f46e5;
          color: white;
          transform: scale(1.05);
        }

        .stats {
          margin-top: 40px;
          font-size: 0.95rem;
          color: #4a5568;
          display: flex;
          justify-content: center;
          gap: 8px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .navbar { flex-direction: column; gap: 10px; padding: 15px 25px; }
          .nav-center { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
          .hero h1 { font-size: 2.2rem; }
          .hero-buttons { flex-direction: column; }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo">
          <img src={icon} className="header-icon" />{" "}
          <span class="logo-text">Tesseract</span>
        </div>

        <div className="nav-right">
          <span 
          className="signin" 
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer" }}
        >
          Sign In
        </span>
          <button className="get-started" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="badge">⚡ Smart Financial Management</div>
          <h1>Categorize Your Expenses, <br /> Automatically</h1>
          <p className="hero-subtext">
            Track where your money goes with intelligent bill categorization.
            Get insights, set budgets, and take control of your financial life.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/register")}>
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <style>{`
        .notfound-container {
          background-color: #0a0a0a;
          color: #fff;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .error-404 {
          font-size: 8rem;
          font-weight: 800;
          color: #e0e0e0;
        }

        .error-message {
          font-size: 1.3rem;
          color: #aaa;
          margin-top: 10px;
          margin-bottom: 30px;
        }

        .home-button {
          background-color: #1a1a1a;
          color: #f0f0f0;
          padding: 12px 26px;
          border: 1px solid #333;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .home-button:hover {
          background-color: #333;
          color: #fff;
          border-color: #555;
          box-shadow: 0 0 10px #222;
        }
      `}</style>

      <div className="notfound-container">
        <div className="error-404">404</div>
        <div className="error-message">Oops! The page you're looking for doesn't exist.</div>
        <button className="home-button" onClick={goHome}>Return to Home</button>
      </div>
    </>
  );
};

export default NotFound;

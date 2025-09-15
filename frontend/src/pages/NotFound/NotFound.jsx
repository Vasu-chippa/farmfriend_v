import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="Not Found Illustration"
          className="notfound-image"
        />
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for doesn’t exist or has been moved.</p>
        <Link to="/" className="home-link">
          ⬅ Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

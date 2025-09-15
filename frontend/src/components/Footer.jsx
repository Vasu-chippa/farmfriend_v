import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2>🌱 FarmFriend</h2>
          <p>Empowering farmers with technology and smart agriculture solutions.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/farmer/dashboard">Farmer Dashboard</a></li>
            <li><a href="/buyer/dashboard">Buyer Dashboard</a></li>
            <li><a href="/agent/dashboard">Agent Dashboard</a></li>
            <li><a href="/admin/login">Admin</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: chippavasu3@gmail.com</p>
          <p>Phone: +91 9381701606</p>
          <div className="socials">
            
            <a
              href="https://www.linkedin.com/in/vasu-chippa-0640112a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>

            <span className="social-name">  Vasu</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FarmFriend. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

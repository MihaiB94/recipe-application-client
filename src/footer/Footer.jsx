import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
   return (
      <div className="footer">
         <div className="footer-container">
            <div className="left-section">
               <div className="footer-links">
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
               </div>
               <p>Maynooth MH602 &copy; 2022</p>
            </div>
            <div className="right-section">
               <a href="#">
                  <i className="fa-brands fa-square-facebook"></i>
               </a>
               <a href="#">
                  <i className="fa-brands fa-twitter"></i>
               </a>
               <a href="#">
                  <i className="fa-brands fa-linkedin"></i>
               </a>
               <a href="#">
                  <i className="fa-brands fa-gitlab"></i>
               </a>
            </div>
         </div>
      </div>
   );
}

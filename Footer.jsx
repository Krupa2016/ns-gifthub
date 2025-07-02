import React from "react";
import "../styles/Landing.css"
import logo1 from "../assets/demo.png"
import logo2 from "../assets/demo.png";
import logo3 from "../assets/demo.png";
import logo4 from "../assets/demo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram,faWhatsapp,faLinkedinIn,faFacebook } from "@fortawesome/free-brands-svg-icons";



const Footer = () => {
  return (
   <>{/* Footer */}
   <footer className="landing-footer">
     <div className="footer-content">
       <div className="footer-logo">
         <h2>ns.trends</h2>
         <p>Turn creativity into custom products</p>
       </div>

       <div className="footer-links">
         <div className="footer-column">
           <h3>Shop</h3>
           <ul>
             <li>
               <a href="#">T-Shirts</a>
             </li>
             <li>
               <a href="#">Hoodies</a>
             </li>
             <li>
               <a href="#">Jerseys</a>
             </li>
             <li>
               <a href="#">Accessories</a>
             </li>
           </ul>
         </div>

         <div className="footer-column">
           <h3>Company</h3>
           <ul>
             <li>
               <a href="#">About Us</a>
             </li>
             <li>
               <a href="#">Blog</a>
             </li>
             <li>
               <a href="#">Careers</a>
             </li>
             <li>
               <a href="#">Press</a>
             </li>
           </ul>
         </div>

         <div className="footer-column">
           <h3>Support</h3>
           <ul>
             <li>
               <a href="#">Contact Us</a>
             </li>
             <li>
               <a href="#">FAQ</a>
             </li>
             <li>
               <a href="#">Shipping</a>
             </li>
             <li>
               <a href="#">Returns</a>
             </li>
           </ul>
         </div>
       </div>

       <div className="footer-newsletter">
         <h3>Stay Updated</h3>
         <p>Subscribe to our newsletter for the latest products and offers</p>
         <div className="newsletter-form">
           <input type="email" placeholder="Your email address" />
           <button>Subscribe</button>
         </div>
       </div>
     </div>

     <div className="footer-bottom">
       <p>&copy; {new Date().getFullYear()} ns.trends. All rights reserved.</p>
       <div className="social-links">
        <a href="#" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" aria-label="WhatsApp">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a href="#" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
     </div>
   </footer></>
  );
};

export default Footer;

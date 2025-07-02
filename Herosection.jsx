import React from "react";
import "./HeroSection.css"; // External CSS for styling

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="/main_bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>N.S TRENDS</h1>
        <p>
          We are a print-on-demand business that turns creativity into custom products.
          From stylish apparel to unique home decor & gifts, we print and ship
          high-quality, made-to-order items without inventory hassles.
          <br />
          Whether for personal use or branding, we bring your ideas to life effortlessly!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;

import React, { useEffect, useRef } from "react";
import "./ImageGallery.css";

const images = [
  "https://i.pinimg.com/736x/8d/93/d6/8d93d6e7ce8a1abcf21149bc6b97f9c8.jpg",
  "https://i.pinimg.com/736x/3d/0d/2e/3d0d2e5f580a2281bddc41533cd2acfc.jpg",
  "https://i.pinimg.com/736x/76/24/af/7624af65d6ec0d3c11beaa7c84f6057f.jpg",
  "https://i.pinimg.com/736x/13/0e/d6/130ed67683d0ed5e70e1be04e2355f49.jpg",
  "https://i.pinimg.com/736x/bd/3c/7b/bd3c7ba0beb436aa0ab81e9ff7661276.jpg",
  "https://i.pinimg.com/736x/3e/bb/51/3ebb513183bf7fa98da81e9f3dfe1bd7.jpg",
  "https://i.pinimg.com/736x/c9/af/e5/c9afe5c860ace699f6e690c5e4f741eb.jpg",
  "https://i.pinimg.com/736x/e0/cc/a1/e0cca1c8502c99504430a93bab3b64cd.jpg",
];

const ImageGallery = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    let scrollInterval;
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (galleryRef.current) {
          galleryRef.current.scrollBy({
            top: 500, 
            behavior: "smooth",
          });

          if (
            galleryRef.current.scrollTop + galleryRef.current.clientHeight >=
            galleryRef.current.scrollHeight
          ) {
            galleryRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      }, 2000);
    };

    startAutoScroll();

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="gallery-container" ref={galleryRef}>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Product ${index + 1}`} className="gallery-img" />
      ))}
    </div>
  );
};

export default ImageGallery;

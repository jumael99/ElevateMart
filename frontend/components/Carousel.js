// frontend/components/Carousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const MyCarousel = () => {
  const carouselItems = [
    {
      imageUrl: 'https://via.placeholder.com/600x400?text=Slide+1',
    },
    {
      imageUrl: 'https://via.placeholder.com/600x400?text=Slide+2',
    },
    {
      imageUrl: 'https://via.placeholder.com/600x400?text=Slide+3',
    },
  ];

  const carouselStyle = {
    margin: '0 auto', // Center align the carousel horizontally
    position: 'relative', // Ensure position relative for absolute positioning of text overlay
  };

  const overlayTextStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%',
    maxWidth: '600px', // Limit width of text overlay
  };

  const title = 'Welcome to Our E-commerce Site'; // Single title for all slides

  return (
    <div style={carouselStyle}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000} // Adjust autoplay interval (milliseconds)
        showStatus={false} // Hide status indicator
        showIndicators={true} // Show slide indicators
        showArrows={true} // Show navigation arrows
      >
        {carouselItems.map((item, index) => (
          <div key={index}>
            <img src={item.imageUrl} style={{ maxHeight: '450px' }} />
            <div style={overlayTextStyle}>{title}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;

// frontend/components/Carousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';  
const MyCarousel = () => {
  const carouselItems = [
    {
      imageUrl: '/images/70432.jpg',   
    },
    {
      imageUrl: 'https://via.placeholder.com/600x400?text=Slide+2',
    },
    {
      imageUrl: 'https://via.placeholder.com/600x400?text=Slide+3',
    },
  ];

  const carouselStyle = {
    margin: '0 auto',
    position: 'relative',  
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
    maxWidth: '600px', 
  };

  const title = 'Welcome to Our E-commerce Site';  

  return (
    <div style={carouselStyle}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}  
        showStatus={false} 
        showIndicators={true} 
        showArrows={true} 
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

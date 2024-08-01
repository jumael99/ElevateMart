// frontend/components/Carousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MyCarousel = () => {
  const carouselItems = [
    {
      imageUrl: "/images/70432.jpg",
    },
    {
      imageUrl: "/images/70432.jpg",
    },
    {
      imageUrl: "/images/70432.jpg",
    },
  ];

    const carouselStyle = {
    margin: '0 auto',
    position: 'relative',
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 464,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <h1 className="text-black font-bold text-3xl text-center pt-6 pb-10">Welcome to Our ElevateMart</h1>
      <div className="mb-5 px-5">
        
        <Slider {...settings} rtl={false}>
          {carouselItems.map((item, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={item.imageUrl}
                alt={`Item ${index}`}
                style={{ maxHeight: "200px"}}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="px-5">
        
        <Slider {...settings} rtl={true}>
          {carouselItems.map((item, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={item.imageUrl}
                alt={`Item ${index}`}
                style={{ maxHeight: "200px" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MyCarousel;


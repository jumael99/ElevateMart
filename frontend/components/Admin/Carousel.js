// frontend/components/Carousel.js

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MyCarousel = () => {
  const dummylItems = [
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

  // const [trendingProducts, setTrendingProducts] = useState([]);

  // useEffect(() => {
  //   const fetchTrendingProducts = async () => {
  //     try {
  //       const response = await axios.get("/api/products/top/trending");
  //       setTrendingProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching trending products", error);
  //     }
  //   };

  //   fetchTrendingProducts();
  // }, []);

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
      <h1 className="text-black font-bold text-3xl text-center pt-6 pb-10">
        Welcome to Our ElevateMart
      </h1>
      <div className="mb-5 px-5">
        <Slider {...settings} rtl={false}>
          {dummylItems.map((product, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ maxHeight: "200px" }}
                // onClick={}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="px-5">
        <Slider {...settings} rtl={true}>
          {dummylItems.map((product, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ maxHeight: "200px" }}
                // onClick={}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MyCarousel;

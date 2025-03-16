"use client";

import React from "react";
import Slider from "react-slick";
import Silde from "./Silde"; // Ensure this is the correct import path

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  const sildeData = [
    {
      id: 0,
      img: "/banner-1.jpg",
      title: "Trending Item",
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$20", // Fixed capitalization of price
    },
    {
      id: 1,
      img: "/banner-2.jpg",
      title: "Trending Accessories",
      mainTitle: "MODERN SUNGLASSES",
      price: "$15", // Fixed capitalization of price
    },
    {
      id: 2,
      img: "/banner-3.jpg",
      title: "Sale Offer",
      mainTitle: "NEW FASHION SUMMER SALE",
      price: "$30", // Fixed capitalization of price
    },
  ];

  return (
    <div>
      <div className="container pt-6 lg:pt-0">
        <Slider {...settings} >
          {sildeData.map((item) => {
            return (
              <Silde
                key={item.id}
                img={item.img}
                title={item.title}
                mainTitle={item.mainTitle}
                price={item.price} // Corrected the capitalization
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;

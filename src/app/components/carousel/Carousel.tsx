"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import CardCandidate from "../cards/CardCandidate";

export default function ListCarousel(props: any) {
  const { data } = props;
  const [index, setIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 576) setItemsPerSlide(1); // xs
      else if (width < 768) setItemsPerSlide(2); // sm
      else if (width < 992) setItemsPerSlide(3); // md
      else setItemsPerSlide(4); // lg and above
    };

    window.addEventListener("resize", updateItemsPerSlide);
    updateItemsPerSlide();

    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const chunkData = (array: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const slides = chunkData(data, itemsPerSlide);

  return (
    <Carousel 
      activeIndex={index} 
      onSelect={handleSelect} 
      className="relative mt-10 pt-10 mb-10 pb-10 bg-slate-400"
      nextIcon={
        <span className="carousel-control-next-icon bg-gray-800 rounded-full p-3" />
      }
      prevIcon={
        <span className="carousel-control-prev-icon bg-gray-800 rounded-full p-3" />
      }
    >
      {slides.map((slide, slideIndex) => (
        <Carousel.Item key={slideIndex} className="align-items-center">
          <div className="flex justify-center flex-wrap">
            {slide.map((item: any) => (
              <div key={item._id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
                <CardCandidate data={item} className="w-full max-w-xs" />
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

"use client"
import React from "react";
import { Card, Carousel } from 'react-bootstrap';
import Header from "./components/Headers/header";
import Footer from "./components/Footer/footer";
import Spinner from "./components/Spinner/Spinner";


export default function Home() {
  return (
    <div>
      <Spinner/> 
      <Header />

      <Carousel className="">
        <Carousel.Item className="h-64 md:h-96 lg:h-128 xl:h-144  ">
          <div className="bg-primary bg-opacity-50 w-full h-full">
            <picture>
              <source className=" " srcSet="/slider/slider1.webp" type="image/webp" />
              <source srcSet="/slider/slider1.jpg" type="image/jpeg" />
              <img
                className="object-cover w-full h-full"
                src="/slider/slider1.jpg"
                alt="First slide"
              />
            </picture>
          </div>
          <Carousel.Caption>
            <h3 className="z-5 ">Texto del Slider 1</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="h-64 md:h-96 lg:h-128 xl:h-144 ">
          <div className="bg-primary bg-opacity-50 w-full h-full">
            <picture className=" ">
              <source srcSet="/slider/slider2.webp" type="image/webp" />
              <source srcSet="/slider/slider2.jpg" type="image/jpeg" />
              <img
                className="object-cover w-full h-full"
                src="/slider/slider2.jpg"
                alt="Second slide"
              />
            </picture>
          </div>
          <Carousel.Caption>
            <h3>Texto del Slider 2</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="h-64 md:h-96 lg:h-128 xl:h-144 bg-primary bg-opacity-50">
          <div className="bg-primary bg-opacity-50 w-full h-full">
            <picture>
              <source srcSet="/slider/slider3.webp" type="image/webp" />
              <source srcSet="/slider/slider3.jpg" type="image/jpeg" />
              <img
                className="object-cover w-full h-full"
                src="/slider/slider3.jpg"
                alt="Third slide"
              />
            </picture>
          </div>
          <Carousel.Caption>
            <h3>Texto del Slider 3</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
     

      <Footer />
    </div>
  );
}

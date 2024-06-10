"use client";
import React, { useState, useEffect } from "react";
//import Carousel from "react-multi-carousel";
import { Carousel, Stack } from "react-bootstrap";
//import "./css/style.css"
//import "react-multi-carousel/lib/styles.css";
import Card from "../cards/CardCandidate";
export default function ListCarousel(props: any) {
  let { data }: any = props;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };
  const dataCards = (items: any) => {
    for (let i = 0; i < data.length; i++) {
      return (
        <Carousel.Item
          key={items._id}
          className=" w-full justify-content-center align-items-center"
        >
          <Stack
            direction="horizontal"
            className="h-full justify-content-center align-items-center"
            gap={3}
          >
            <Card className="w-64 max-w-64 min-w-64 h-64" data={items}></Card>
          </Stack>
        </Carousel.Item>
      );
    }
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="  mt-10 pt-10 mb-10 pb-10 justify-content-center bg-slate-400"
    >
      {data.map((image: any) => dataCards(image))}
    </Carousel>
  );
}

"use client";
import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import axios from "axios";

export function CarouselMultiAsociados(props: any) {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!(data.length > 0)) fetchData()
  }, [data])

  const fetchData = async () => {
    const res = await axios.post('/api/administrator/homepage')
    if(res.status === 200) console.log("sucessful"), setData(res.data.homePage[0].logos_asociados), console.log(res.data)
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="text-left py-6">
      <h3 className="ml-3 font-bold text-cyan-500">Empresas <br /> que Confían en Nosotros</h3>
      <Carousel responsive={responsive} infinite={true}>
        {data.map((item:any, i:number) => (
          <div key={i} className="flex justify-center items-center h-60">
            <div className="flex justify-center items-center">
              <Image
                src={`${item.logo.ruta}`}
                width={400}
                alt="Asociados GRUPO ALCO"
                height={300}
                className="object-contain  w-full  h-52 "
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

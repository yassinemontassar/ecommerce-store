"use client";
import Image from "next/image";
import { Tab } from "@headlessui/react";

import { Image as ImageType } from "@/types";
import GalleryTab from "./gallery-tab";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            type: "progressbar",
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                <Image
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  src={image.url}
                  alt="image"
                  className="object-cover object-center"
                />
              </div>
              <div className="swiper-button-prev"></div>
<div className="swiper-button-next"></div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </Tab.Panels>
    </Tab.Group>
  );
};
export default Gallery;

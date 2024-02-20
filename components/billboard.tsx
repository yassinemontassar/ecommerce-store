"use client";
import { Billboard as BillboardType } from "@/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCube, Pagination } from "swiper/modules";
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Image from "next/image";


SwiperCore.use([Navigation, Autoplay, EffectCube, Pagination]);

interface BillboardProps {
  data: BillboardType[];
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <Swiper
      effect="cube"
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={true}
      modules={[EffectCube, Pagination, Autoplay, Navigation]}
      navigation
    >
      {data.map((billboard) => (
        <SwiperSlide key={billboard.id}>
          <div  className="m-2 h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] relative bg-no-repeat bg-center bg-cover border-4 border-gray-300 rounded-lg">
          <Image
            alt={billboard.label} // Use the billboard label as the alt text
            src={billboard.imageUrl} // Use the src prop to specify the image source
            fill // Use the layout prop to fill the container
            priority={true} // Use the priority prop to preload the image
            quality={50} // Use the quality prop to adjust the image quality and compression level
            className="relative"
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          </div>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            </div>  
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Billboard;

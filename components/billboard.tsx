"use client";
import { Billboard as BillboardType } from "@/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCube, Pagination } from "swiper/modules";
import SwiperCore from 'swiper';
import 'swiper/css/bundle';


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
          <div
            className="h-[400px] object-contain  relative bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${billboard.imageUrl})` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
              <p className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">{billboard.label}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Billboard;

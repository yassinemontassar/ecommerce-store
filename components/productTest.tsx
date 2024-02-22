"use client"
import 'swiper/css/bundle';
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductListProps {
    title: string;
    items: Product[];
};

const ProductListTest: React.FC<ProductListProps> = ({
    title,
    items
}) => {
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-2xl text-center">{title}</h3>
            {items.length === 0 && <NoResults />}
            <Swiper
                navigation
                pagination={false}
                loop={true}
                autoplay={{
                    delay: 1500, // time between transitions in ms
                    disableOnInteraction: true, // disable autoplay when user interacts with the slider
                }}
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                     
                    },
                    640: {
                        slidesPerView: 2,
                       
                    },
                    768: {
                        slidesPerView: 3,
                       
                    },
                    1024: {
                        slidesPerView: 4,
                       
                    },
                }}
            >
           
            {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ProductCard data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        
    );
} 
export default ProductListTest;
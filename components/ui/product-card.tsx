"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCard {
    data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    
    const cart = useCart();
    const PreviewModal = usePreviewModal();
    const router = useRouter();
    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        PreviewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data,1,'');
    }
    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
           {/* images and actions */}
           <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image 
                    src={data?.images?.[0]?.url}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    alt="Image"
                    priority={true}
                    placeholder="empty"
                    className="aspect-square object-cover rounded-md"
                />
                { data.discount &&
                <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-1 px-2 rounded-full shadow-lg transform -rotate-6 hover:-rotate-12 transition-transform">
      <span className="text-xs font-semibold">Discount</span> {data.discount} %
    </div> }
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton 
                        onClick={onPreview}
                        icon={<Expand size={20} className="text-gray-600" />}
                        />
                          <IconButton 
                        onClick={onAddToCart}
                        icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
           </div>
           {/* Description */}
           <div>
            <p className="font-semibold text-lg">
                {data.name}
            </p>
            <p className="text-sm text-gray-500">
                {data.category?.name}
            </p>
           </div>
           {/* Price */}
           {data?.discount ? (
           <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 line-through">
             <Currency value={data?.price} />
             </span>
             <Currency value={ (Number(data?.price)) - (Number(data?.price)) * (Number(data?.discount)) / 100} />
            </div>
            ) : (
                <div className="flex items-center justify-between">
                <Currency value={data?.price} />
                </div>
            )}
       
        

        </div>
    );
}
export default ProductCard;
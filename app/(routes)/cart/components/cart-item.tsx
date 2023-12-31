import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const items = useCart((state) => state.items);
  const [quantity, setQuantity] = useState(() => {
    const storedItem = items.find((item) => item.id === data.id);
    return storedItem ? storedItem.quantity : 1;
  });

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);
    cart.updateQuantity(data.id,newQuantity )
  };

  // Convert the product price to a number before multiplication
  const productPrice = parseFloat(data.price) - (parseFloat(data.price) * (parseFloat(data.discount) || 0) / 100) || 0;

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div>
          <div className="flex mt-2">
            <label className="text-gray-500">Quantity:</label>
            <input
              type="number"
              pattern="[0-9]*"  // Allow only numeric input
              value={quantity <= 0 ? '' : quantity} 
              min="1"
              onChange={handleQuantityChange}
              inputMode="numeric"
              className="ml-2 p-1 border border-gray-300 rounded-md w-12"
            />
          </div>
          {/* Use the converted productPrice for multiplication */}
          <Currency value={productPrice * quantity} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;

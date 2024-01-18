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
  const [Taille, setTaille] = useState(() => {
    const storedItem = items.find((item) => item.id === data.id);
    return storedItem ? storedItem.taille : "";
  });

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);
    cart.updateQuantity(data.id,newQuantity )
  };

  const handleTailleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTaille = e.target.value;
    setTaille(newTaille);
    cart.updateTaille(data.id,newTaille )
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
            <p className="text-gray-500">Coleur:</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500"/>
            <div 
        className="h-5 w-5 rounded-full border"
        style={{ backgroundColor: data.color.value}}
        />
          
          </div>
          <div>
  <div className="flex mt-2 items-center">
    <label className="text-gray-500">Quantite:</label>
    <div className="ml-2 p-1  border-gray-300 rounded-md">
      <input
        required
        type="number"
        pattern="[0-9]*"
        value={quantity <= 0 ? '' : quantity} 
        min="1"
        onChange={handleQuantityChange}
        inputMode="numeric"
        className="p-1 border border-gray-300 rounded-md w-12"
      />
    </div>
  </div>
  <div className="flex mt-2 items-center">
    <label className="text-gray-500">Taille:</label>
    <div className="ml-5 p-1  border-gray-300 rounded-md">
      <select style={{ overflowY: 'auto' }}
        required
        className="ml-2 p-1 border border-gray-300 rounded-md"
        value={Taille}
        onChange={handleTailleChange}
      >
        <option value="" disabled>
        Choisir la taille
  </option>
        {data.size.value.split(',').map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
      </select>
    </div>
  </div>
</div>

          
          {/* Use the converted productPrice for multiplication */}
          <Currency value={productPrice * quantity} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;

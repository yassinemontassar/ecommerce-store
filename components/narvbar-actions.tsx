"use client";

import Button from "@/components/ui/button"
import useCart from "@/hooks/use-cart";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import {  useEffect, useState} from "react";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=> {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if (!isMounted) {
        return null;
    }
    
    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button onClick={() => router.push("/cart")} className="flex items-center  bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-600 hover:to-gray-800 text-white font-bold py-2 px-4 rounded-full shadow focus:outline-none active:bg-gray-700 ">
                <ShoppingCart
                    size={20}
                    color="white"
                />
                <span className="ml-2 text-sm font-black text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    );
}
export default NavbarActions;
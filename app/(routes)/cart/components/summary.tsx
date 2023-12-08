"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import CustomModal from "@/components/ui/customModal";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isModalOpen, setModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isCheckingOut, setCheckingOut] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);

  useEffect(() => {
    if (searchParams.get('success') !== null) {
      removeAll();
      toast.success('Payment completed.');
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={1500} />
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  useEffect(() => {
    setButtonDisabled(isCheckingOut || items.length === 0 || !phoneNumber || !address || checkoutInitiated);
  }, [isCheckingOut, items, phoneNumber, address, checkoutInitiated]);

  const onCheckout = async () => {
    if (!phoneNumber || !address || items.length === 0 || isCheckingOut || isButtonDisabled) {
      // If any of them is empty or checkout is in progress, prevent checkout
      toast.error("Enter your details first or wait for the current checkout to complete!");
      return;
    }

    try {
      if (!checkoutInitiated) {
        setCheckoutInitiated(true); // Set flag to prevent further clicks
        setCheckingOut(true); // Set loading state

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          productIds: items.map((item) => item.id),
          quantity: items.map((item) => item.quantity),
          address,
          phoneNumber,
        });

        window.location = response.data.url;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle error, display error toast, etc.
    } finally {
      setCheckingOut(false); // Reset loading state, whether success or failure
    }
  };


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = ({ address, phoneNumber }: { address: string; phoneNumber: string }) => {
    setAddress(address);
    setPhoneNumber(phoneNumber);
    closeModal(); 
  };

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)* item.quantity;
  }, 0);

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      {/* Button to open the modal */}
      <Button onClick={openModal}  disabled={items.length === 0 || items.map(item => item.quantity).includes(0)} className="w-full mt-6">
        Enter Details
      </Button>

      {/* Modal */}
      <CustomModal open={isModalOpen} onClose={closeModal} onSubmit={onSubmit}>
        <p>Enter your address and phone number details here!</p>
      </CustomModal>

      {/* Button to trigger the API request */}
      <Button
        onClick={onCheckout}
        disabled={isButtonDisabled}
        className={`w-full mt-6 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {isCheckingOut ? "Loading..." : "Checkout"}
      </Button>
    </div>
  );
};

export default Summary;

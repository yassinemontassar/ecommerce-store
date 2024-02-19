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
import { Fingerprint } from "lucide-react";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isModalOpen, setModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const[name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isCheckingOut, setCheckingOut] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (searchParams.get('success') !== null) {
      removeAll();
      toast('Merci pour votre commande! Nous vous contacterons bientôt.', {
        duration: 4000,
        position: 'bottom-right',
      
        // Styling
        style: {
          background: '#333',      // Background color
          color: '#fff',           // Text color
          border: '2px solid #00f', // Border style
          borderRadius: '8px',     // Border radius
        },
        className: '',
      
        // Custom Icon
        icon: '✔️',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#00ff00',   // Primary color (default is black)
          secondary: '#fff',    // Secondary color (default is white)
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      setShowConfetti(true);
      
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  useEffect(() => {
    setButtonDisabled(isCheckingOut || items.length === 0 || !phoneNumber || !address || !name || checkoutInitiated);
  }, [isCheckingOut, items, name, phoneNumber, address, checkoutInitiated]);


  
  const onCheckout = async () => {
    if (!phoneNumber || !address || !name || items.length === 0 || isCheckingOut || isButtonDisabled) {
      // If any of them is empty or checkout is in progress, prevent checkout
      toast.error("Entrez vos informations d'abord", {
        duration: 5000,
        position: 'bottom-center',
        
        // Styling
        style: {
          background: '#dc3545',    // Background color (red for error)
          color: '#fff',             // Text color
          border: '2px solid #c82333', // Border style
          borderRadius: '8px',       // Border radius
        },
        className: '',
        
        // Custom Icon
        icon: '❌', // You can choose a different emoji or icon for error
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#fff',       // Primary color (default is black)
          secondary: '#dc3545',  // Secondary color (red for error)
        },
        
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      
      return;
    }

    try {
      if (!checkoutInitiated) {
        setCheckoutInitiated(true); // Set flag to prevent further clicks
        setCheckingOut(true); // Set loading state

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          productIds: items.map((item) => item.id),
          quantity: items.map((item) => item.quantity),
          taille: items.map((item) => item.taille),
          address,
          phoneNumber,
          name
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
    const hasItemWithEmptySize = items.map(item => item.taille)
    console.log(hasItemWithEmptySize)
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = ({ address, phoneNumber, name }: { address: string; phoneNumber: string, name: string }) => {
    setAddress(address);
    setPhoneNumber(phoneNumber);
    setName(name);
    closeModal(); 
  };

  const totalPrice = items.reduce((total, item) => {
    return total + (Number(item.price || 0) - (Number(item.price || 0) * (Number(item.discount) || 0) / 100)) * item.quantity;
  }, 0);

  return (
    
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">

      <h2 className="text-lg font-medium text-gray-900">Détails de la commande</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Prix total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      {/* Button to open the modal */}
      <Button onClick={openModal}  disabled={items.length === 0 || items.map(item => item.quantity).includes(0) || items.some(item => item.taille === '')} className="w-full mt-6">
      Continuer avec vos Informations
      </Button>

      {/* Modal */}
      <CustomModal open={isModalOpen} onClose={closeModal} onSubmit={onSubmit}>
        <p>Entrez votre nom, numéro de téléphone et adresse</p>
      </CustomModal>

        {/* Confetti */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={1000}
          />
        )}
      {/* Button to trigger the API request */}
      <Button
        onClick={onCheckout}
        className={`w-full mt-6 ${isButtonDisabled ? 'cursor-not-allowed ' : ''}`}
      >
        {isCheckingOut ? "Loading..." : "Finaliser la Commande"}
      </Button>
    </div>
    
  );
};

export default Summary;

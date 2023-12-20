"use client";
import { ArrowUp, ArrowUp01, ArrowUp01Icon, ArrowUp10, ArrowUpCircle, ArrowUpCircleIcon, ArrowUpFromDot, ArrowUpSquareIcon } from 'lucide-react';
import { useEffect, useState } from 'react';


const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 100); // Adjust this value based on when you want the button to appear
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 bg-blue-500 p-2 rounded-full text-white animate-bounce z-[100] ${
        isVisible ? 'visible' : 'invisible'
      }`}
      onClick={scrollToTop}
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTopButton;

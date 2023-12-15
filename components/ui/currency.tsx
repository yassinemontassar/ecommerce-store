"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('en-TN', {
  style: 'currency',
  currency: 'TND',
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
  value = 0
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const formattedValue = formatter.format(Number(value));
  const currencySymbol = formattedValue.replace(/[0-9.,]/g, '').trim();
  const numericValue = formattedValue.replace(/[^0-9.,]/g, '').trim();

  return ( 
    <div className="font-semibold">
      {numericValue} {currencySymbol}
    </div>
  );
}

export default Currency;

"use client";

import React, { useState, useEffect } from 'react';

export default function CountdownTimer({
  targetDate,
  textMainClass = "text-[#700a0a]",
  textMutedClass = "text-[#7c7566]"
}: {
  targetDate: string,
  textMainClass?: string,
  textMutedClass?: string
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return null;

  return (
    <div className="flex gap-4 justify-center items-center mt-2">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className={`text-2xl md:text-3xl font-sans font-regular mb-2 ${textMainClass}`}>
            {value.toString().padStart(2, '0')}
          </div>
          <div className={`text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-sans font-bold ${textMutedClass}`}>
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}

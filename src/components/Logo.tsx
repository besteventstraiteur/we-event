
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-serif font-bold text-xl ${className}`}>
      <span className="text-vip-white">Best Events</span>
      <span className="text-vip-gold ml-1">VIP</span>
    </div>
  );
};

export default Logo;

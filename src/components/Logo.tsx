
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={`font-serif font-bold text-xl ${className} hover:opacity-90 transition-opacity`}>
      <div className="flex items-center">
        <span className="text-vip-white">Best Events</span>
        <span className="text-vip-gold ml-1">VIP</span>
      </div>
    </Link>
  );
};

export default Logo;

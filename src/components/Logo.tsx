
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <div className="text-2xl font-bold">
          <span className="text-white">Best</span>
          <span className="text-vip-gold">Events</span>
        </div>
        <div className="ml-1 px-1.5 py-0.5 bg-vip-gold text-vip-black text-xs font-bold rounded-sm">
          VIP
        </div>
      </div>
    </Link>
  );
};

export default Logo;

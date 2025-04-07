
import React from "react";
import { Link } from "react-router-dom";
import WeEventLogo from "@/components/WeEventLogo";

interface HomeFooterProps {}

const HomeFooter: React.FC<HomeFooterProps> = () => {
  return (
    <footer className="py-8 border-t border-we-beige bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <WeEventLogo size="small" />
          </Link>
          <p className="text-we-gray-500 text-sm">
            © {new Date().getFullYear()} We Event. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/partners" className="text-we-gray-600 hover:text-we-gold text-sm">
              Prestataires
            </Link>
            <Link to="/privacy" className="text-we-gray-600 hover:text-we-gold text-sm">
              Confidentialité
            </Link>
            <Link to="/terms" className="text-we-gray-600 hover:text-we-gold text-sm">
              Conditions
            </Link>
            <Link to="/contact" className="text-we-gray-600 hover:text-we-gold text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;


import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center text-vip-black">{t('common.contact')}</h1>
      <p className="text-vip-gray-600 text-center mb-12">
        {t('contact.subtitle')}
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        
        <div>
          <ContactInfo />
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;

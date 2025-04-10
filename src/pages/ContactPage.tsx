
import React from "react";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactContent from "@/components/contact/ContactContent";
import ContactFooter from "@/components/contact/ContactFooter";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ContactHeader />

      <main className="flex-1 container py-12 bg-white">
        <ContactContent />
      </main>

      <ContactFooter />
    </div>
  );
};

export default ContactPage;

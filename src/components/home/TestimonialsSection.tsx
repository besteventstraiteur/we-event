
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import WeEventButton from "@/components/WeEventButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  name: string;
  event: string;
  text: string;
  rating: number;
}

interface TestimonialsSectionProps {}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  const { t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      name: t('home.testimonials.person1.name'),
      event: t('home.testimonials.person1.event'),
      text: t('home.testimonials.person1.text'),
      rating: 5
    },
    {
      name: t('home.testimonials.person2.name'),
      event: t('home.testimonials.person2.event'),
      text: t('home.testimonials.person2.text'),
      rating: 4.5
    },
    {
      name: t('home.testimonials.person3.name'),
      event: t('home.testimonials.person3.event'),
      text: t('home.testimonials.person3.text'),
      rating: 5
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-we-beige/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl mb-2 text-we-green">{t('home.testimonialsTitle')}</h2>
          <p className="text-we-gray-600">{t('home.testimonialsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(testimonial.rating) ? "text-we-gold" : "text-we-gray-300"}
                      fill={i < Math.floor(testimonial.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-we-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-we-gray-500">{testimonial.event}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/partners">
            <WeEventButton>
              {t('home.seeAllReviews')}
            </WeEventButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

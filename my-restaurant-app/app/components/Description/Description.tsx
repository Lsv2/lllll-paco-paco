import React, { useRef, useEffect } from 'react';
import DestinationData from './DescriptionsData';

const Description: React.FC = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.current?.observe(el as Element));

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <div className="description">
      <h1>About PP</h1>
      <p>The only taco shop that will help find your dream taco.</p>

      <DestinationData
        className="first-box hidden"
        heading="Premium Taco Creations"
        text="Welcome to a new level of taco dining. Our restaurant combines the vibrant flavors of traditional Mexican cuisine with a modern, upscale twist. Each taco is carefully crafted using the finest ingredients, from locally sourced produce to premium meats and seafood. Our innovative recipes and creative presentations elevate the taco experience to a culinary masterpiece."
        source1="/images/img-1.jpg"
        source2="/images/img-2.jpg"
      />

      <DestinationData
        className="first-box-reverse hidden"
        heading="Extraordinary Culinary Experience"
        text="Experience the difference in every bite and discover why we are the go-to destination for taco connoisseurs. Join us for an unforgettable dining experience that celebrates the artistry and passion behind every taco creation."
        source1="/images/img-3.jpg"
        source2="/images/img-4.jpg"
      />
    </div>
  );
};

export default Description;

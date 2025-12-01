import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    let timeout;
    const handleMouseMove = (e) => {
      clearTimeout(timeout);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const halfWidth = rect.width / 2;

      if (x < halfWidth) {
        // Left half: slide previous
        timeout = setTimeout(() => {
          swiper.slidePrev();
        }, 300);
      } else {
        // Right half: slide next
        timeout = setTimeout(() => {
          swiper.slideNext();
        }, 300);
      }
    };

    const container = swiperRef.current?.querySelector('.swiper');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Testimonials & Success Stories
        </h2>

        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="rounded-xl"
        >
          {[
            {
              name: "John Doe",
              img: "/images.jpeg",
              text: "This university changed my life! The professors were supportive and the programs prepared me for my career.",
            },
            {
              name: "Jane Smith",
              img: "/images.jpeg",
              text: "The scholarship I received made my dreams come true. I’m now working at a Fortune 500 company!",
            },
            {
              name: "Alex Johnson",
              img: "/images.jpeg",
              text: "Amazing campus and great opportunities for networking. Highly recommended!",
            },
            {
              name: "Sophia Lee",
              img: "/images.jpeg",
              text: "I loved my time here! The internships I got through campus placements boosted my confidence.",
            },
            {
              name: "Michael Brown",
              img: "/images.jpeg",
              text: "Excellent guidance from counselors. Secured my dream course abroad with their help!",
            },
          ].map((testimonial, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white hover:bg-yellow-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 border border-yellow-100 h-80 flex flex-col justify-between">
                <div>
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200 shadow-md"
                  />
                  <p className="text-gray-700 text-center mb-3 italic leading-relaxed text-sm line-clamp-4">
                    "{testimonial.text}"
                  </p>
                </div>
                <p className="text-yellow-500 font-semibold text-center text-sm mt-auto">
                  – {testimonial.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev !text-gray-900 !bg-white shadow-xl !rounded-full w-16 h-16 flex items-center justify-center hover:scale-110 hover:bg-yellow-50 hover:shadow-2xl hover:text-yellow-600 transition-all duration-300 absolute top-1/2 -left-6 z-10 border-2 border-gray-200 hover:border-yellow-400">
          <ChevronLeft className="w-7 h-7" />
        </div>
        <div className="swiper-button-next !text-gray-900 !bg-white shadow-xl !rounded-full w-16 h-16 flex items-center justify-center hover:scale-110 hover:bg-yellow-50 hover:shadow-2xl hover:text-yellow-600 transition-all duration-300 absolute top-1/2 -right-6 z-10 border-2 border-gray-200 hover:border-yellow-400">
          <ChevronRight className="w-7 h-7" />
        </div>
      </div>
    </section>
  );
}
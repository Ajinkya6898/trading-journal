"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const quotes = [
  {
    text: "Plan your trade and trade your plan.",
    author: "Linda Bradford Raschke",
  },
  {
    text: "Cut your losses quickly, let your profits run.",
    author: "Jesse Livermore",
  },
  {
    text: "The goal of a successful trader is to make the best trades. Money is secondary.",
    author: "Alexander Elder",
  },
  {
    text: "Amateurs want to be right. Professionals want to make money.",
    author: "Bill Lipschutz",
  },
  {
    text: "It’s not whether you’re right or wrong that’s important, but how much money you make when you’re right and how much you lose when you’re wrong.",
    author: "George Soros",
  },
];

export default function TraderQuotesSlider() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-10">
      <div className="relative">
        {/* Custom arrows - outside Swiper so they are not repeated */}
        <div className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </div>
        <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
          <ArrowRight className="h-5 w-5 text-gray-600" />
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
        >
          {quotes.map(({ text, author }, index) => (
            <SwiperSlide key={index}>
              <blockquote className="text-center italic text-gray-700 text-lg">
                “{text}”
                <footer className="mt-4 text-sm font-semibold text-gray-900">
                  — {author}
                </footer>
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination mt-4 flex justify-center" />
      </div>
    </div>
  );
}

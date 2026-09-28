import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import heroData from "./heroData";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroData.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroData.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (paused || heroData.length <= 1) return;

    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, []);

  const slide = heroData[current];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-slate-100
        shadow-lg
      "
    >
      {/* Banner */}

      <Link
        to={slide.link}
        className="
          block
          relative
          h-[220px]
          sm:h-[300px]
          md:h-[360px]
          lg:h-[430px]
          xl:h-[500px]
        "
      >
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.alt}
          className="
            h-full
            w-full
            object-cover
            transition-opacity
            duration-500
          "
        />
      </Link>

      {/* Previous */}

      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="
          absolute
          left-4
          top-1/2
          z-20
          flex
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white/80
          text-slate-700
          shadow-md
          backdrop-blur
          transition
          hover:bg-white
        "
      >
        <FiChevronLeft size={22} />
      </button>

      {/* Next */}

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute
          right-4
          top-1/2
          z-20
          flex
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white/80
          text-slate-700
          shadow-md
          backdrop-blur
          transition
          hover:bg-white
        "
      >
        <FiChevronRight size={22} />
      </button>

      {/* Dots */}

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroData.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? "h-3 w-8 bg-orange-500"
                : "h-3 w-3 bg-white/80 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
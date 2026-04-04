"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BannerSlide {
  id: string;
  title: string;
  image: string;
  category: string;
  link: string;
}

const defaultSlides: BannerSlide[] = [
  {
    id: "default-1",
    title: "ยินดีต้อนรับสู่ตำบลทับสะแก — เมืองมะพร้าวทะเล",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    category: "ทับสะแก",
    link: "/tourism",
  },
  {
    id: "default-2",
    title: "ร้านค้าและบริการในชุมชนทับสะแก",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop",
    category: "ร้านค้า",
    link: "/shops",
  },
  {
    id: "default-3",
    title: "ค้นหางานใกล้บ้าน ในตำบลทับสะแก",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=600&fit=crop",
    category: "หางาน",
    link: "/jobs",
  },
];

interface HeroBannerProps {
  newsSlides?: { id: string; title: string; coverImage: string; category: string }[];
}

export function HeroBanner({ newsSlides }: HeroBannerProps) {
  const slides: BannerSlide[] =
    newsSlides && newsSlides.length > 0
      ? newsSlides.map((n) => ({
          id: n.id,
          title: n.title,
          image: n.coverImage,
          category: n.category,
          link: `/news/${n.id}`,
        }))
      : defaultSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[420px] md:h-[540px] overflow-hidden rounded-2xl shadow-2xl group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Link href={slide.link} className="block w-full h-full">
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-linear ${
                  index === currentSlide ? "scale-110" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <div className={`transition-all duration-500 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                    {slide.category}
                  </span>
                  <h2 className="text-2xl md:text-5xl font-bold mb-4 text-white leading-tight line-clamp-2 drop-shadow-lg max-w-3xl">
                    {slide.title}
                  </h2>
                  <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                    อ่านเพิ่มเติม <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white border-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white border-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Progress dots + bar */}
      <div className="absolute bottom-3 md:bottom-6 right-6 md:right-12 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentSlide(index); setProgress(0); }}
            className="relative h-1 rounded-full overflow-hidden transition-all"
            style={{ width: index === currentSlide ? 48 : 16 }}
          >
            <div className="absolute inset-0 bg-white/30 rounded-full" />
            {index === currentSlide && (
              <div
                className="absolute left-0 top-0 bottom-0 bg-white rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            )}
            {index !== currentSlide && (
              <div className="absolute inset-0 bg-white/50 rounded-full hover:bg-white/70 transition-colors" />
            )}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 text-white/60 text-xs font-medium backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
        {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </div>
  );
}

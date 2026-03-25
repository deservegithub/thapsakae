"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link href={slide.link}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block bg-primary px-3 py-1 rounded text-sm font-semibold mb-3">
                  {slide.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 line-clamp-2">
                  {slide.title}
                </h2>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

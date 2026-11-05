"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "A small library for big curiosities",
    title: "Find your next good read.",
    text: "Browse a thoughtful collection, borrow a book for a few days, and keep your reading life in one quiet place.",
    label: "Vol. 01",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2200&q=85",
  },
  {
    eyebrow: "Stories worth making time for",
    title: "Open a new chapter.",
    text: "Discover familiar classics and unexpected favorites waiting on the BookNook shelf.",
    label: "Vol. 02",
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=2200&q=85",
  },
  {
    eyebrow: "Your reading life, in one place",
    title: "Read widely. Stay curious.",
    text: "Find a book, borrow it for up to 14 days, and return it when your next story calls.",
    label: "Vol. 03",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2200&q=85",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Keyboard, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        keyboard={{ enabled: true }}
        loop
        pagination={{ clickable: true }}
        className="booknook-hero-swiper min-h-[calc(100vh-180px)]"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.label}
            style={{ backgroundImage: `url("${slide.image}")` }}
            className="!bg-cover !bg-center"
          >
            <div className="relative flex min-h-[calc(100vh-85px)] items-center bg-black/55 px-6 py-20 text-white sm:px-12 lg:px-20">
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
              <div className="relative z-10 max-w-3xl">
                <div className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                  <Sparkles className="size-4" />
                  {slide.eyebrow}
                </div>
                <h1 className="max-w-4xl font-heading text-6xl leading-[0.93] tracking-[-0.06em] sm:text-8xl lg:text-[8rem]">
                  {slide.title}
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
                  {slide.text}
                </p>
                <Link
                  href="/books"
                  className="mt-10 inline-flex h-12 items-center justify-center gap-3 border border-white/30 bg-primary px-6 text-sm text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Browse Books
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

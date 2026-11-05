import { Suspense } from "react";
import FeaturedBooks from "@/components/Home/FeaturedBooks";
import HeroSection from "@/components/Home/HeroSection";
import BookNookFeatures from "@/components/Home/BookNookFeatures";
import HowBorrowingWorks from "@/components/Home/HowBorrowingWorks";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense
        fallback={
          <section className="mx-auto w-full max-w-7xl border-t border-border px-6 py-24 lg:px-10 lg:py-32">
            <p className="text-muted-foreground">
              Opening the featured shelf...
            </p>
          </section>
        }
      >
        <FeaturedBooks />
      </Suspense>
      <HowBorrowingWorks />
      <BookNookFeatures />
    </>
  );
}

import { ArrowRight} from "lucide-react";

import { Button } from "@/components/ui/button";
import BookCard from "../Books/BookCard";
import Link from "next/link";


export const dynamic = "force-dynamic";

export default async function FeaturedBooks() {
  const res = await fetch("http://localhost:5000/books?limit=6", {
      cache: "no-store",
    });
    const booksData = await res.json()

  return (
    <section
      id="browse"
      className="mx-auto w-full max-w-7xl border-t border-border px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            From the shelf
          </p>
          <h2 className="max-w-2xl font-heading text-5xl leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            Featured for your next chapter.
          </h2>
        </div>
        <Link href="/books" className="w-fit px-0 text-sm flex gap-2">
          View all books
          <ArrowRight />
        </Link>
      </div>

      {!booksData ? (
        <p className="border border-destructive/40 bg-destructive/5 p-8 text-destructive">
          
            No books are available on the shelf yet.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {booksData.map((book:bookType) => (
              <BookCard key={book._id} book={book}/> 
          ))}
        </div>
      )}
    </section>
  );
}

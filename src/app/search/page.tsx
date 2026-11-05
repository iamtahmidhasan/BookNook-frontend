"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import BookCard from "@/components/Books/BookCard";

export default function SearchPage() {
  const [books, setBooks] = useState<bookType[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);

        if (!response.ok) {
          throw new Error(`The books API responded with ${response.status}.`);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The books API returned an invalid response.");
        }

        setBooks(data as bookType[]);
      } catch (loadError) {
        console.error("Failed to load books for search.", loadError);
        setError("We could not load the library. Please try again shortly.");
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      return books;
    }

    return books.filter((book) =>
      [book.title, book.author, book.category].some((value) =>
        value?.toLowerCase().includes(searchTerm),
      ),
    );
  }, [books, query]);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-14 border-b border-border pb-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Search the shelf
        </p>
        <h1 className="font-heading text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">
          Find a book.
        </h1>
        <label className="relative mt-8 block max-w-2xl">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, author, or category"
            aria-label="Search books"
            className="h-14 w-full border border-border bg-background pl-12 pr-4 text-base outline-none transition-colors focus:border-primary"
          />
        </label>
      </div>

      {isLoading && <p className="text-muted-foreground">Searching the shelf...</p>}

      {error && (
        <p className="border border-destructive/40 bg-destructive/5 p-8 text-destructive">
          {error}
        </p>
      )}

      {!isLoading && !error && filteredBooks.length === 0 && (
        <p className="border border-dashed border-border p-8 text-muted-foreground">
          No books match your search.
        </p>
      )}

      {!isLoading && !error && filteredBooks.length > 0 && (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}

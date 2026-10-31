import { Search } from "lucide-react";
import { Suspense } from "react";

import BookCard from "@/components/Books/BookCard";
import { Button } from "@/components/ui/button";

function BooksLoading() {
  return (
    <p className="text-muted-foreground" role="status">
      Opening the library...
    </p>
  );
}

export default async function BooksPage() {
  const response = await fetch("http://localhost:5000/books", {
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="mb-16 flex flex-col justify-between gap-8 border-b border-border pb-10 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            The complete collection
          </p>
          <h1 className="font-heading text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">
            All books.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Browse every title on the shelf and find something worth borrowing.
          </p>
        </div>
        <Button variant="outline" size="lg">
          <Search />
          Search library
        </Button>
      </div>

      <Suspense fallback={<BooksLoading />}>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {data && data.map((book:bookType) => (
            <BookCard key={book._id} book={book} />
          ))}
          {
            data.length === 0 ?  ( <p className="border border-dashed border-border p-8 text-muted-foreground">
        No books are available on the shelf yet.
      </p>) : ""
          }
        </div>
      </Suspense>
    </section>
  );
}

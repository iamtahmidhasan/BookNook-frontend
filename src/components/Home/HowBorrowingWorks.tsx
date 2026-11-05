import { BookOpen, Clock3, Search } from "lucide-react";

export default function HowBorrowingWorks() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            A simple ritual
          </p>
          <h2 className="max-w-xl font-heading text-5xl leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            How borrowing works.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
            Your next story is only a few thoughtful steps away.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div className="border-t border-border pt-5">
            <Search className="size-6 text-primary" />
            <p className="mt-6 font-heading text-2xl">01. Find</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Browse the shelf and choose a book that meets your curiosity.
            </p>
          </div>
          <div className="border-t border-border pt-5">
            <BookOpen className="size-6 text-primary" />
            <p className="mt-6 font-heading text-2xl">02. Borrow</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Borrow available copies for a focused fourteen-day reading window.
            </p>
          </div>
          <div className="border-t border-border pt-5">
            <Clock3 className="size-6 text-primary" />
            <p className="mt-6 font-heading text-2xl">03. Return</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Return the book when you are ready and make room for the next reader.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

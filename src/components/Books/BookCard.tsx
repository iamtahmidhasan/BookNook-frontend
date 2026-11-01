import { ArrowRight, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type BookCardProps = {
  book: bookType;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group">
      <Link href={`/book/${book._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden border border-border bg-muted">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover h-full w-auto aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col justify-between bg-[#c6b59a] p-6 text-[#29241e]">
              <div className="flex items-start justify-between text-[0.65rem] uppercase tracking-[0.18em]">
                <span>BookNook</span>
                <span>{book.publishedYear}</span>
              </div>
              <div>
                <BookOpen className="mb-5 size-9 stroke-[1.2]" />
                <h3 className="max-w-[13rem] font-heading text-4xl leading-[0.9] tracking-[-0.05em]">
                  {book.title}
                </h3>
              </div>
              <p className="text-xs uppercase tracking-[0.15em]">
                {book.category}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-4 border-b border-border py-5">
          <div>
            <h2 className="font-heading text-2xl leading-tight tracking-[-0.03em]">
              {book.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {book.category} · {book.publishedYear}
            </p>
            {(book.ownerName || book.ownerEmail) && (
              <p className="mt-2 text-xs text-muted-foreground">
                Owner: {book.ownerName || "N/A"} {book.ownerEmail ? `(${book.ownerEmail})` : ""}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="mt-1 shrink-0 rounded-full"
            aria-label={`Borrow ${book.title}`}
          >
            <ArrowRight />
          </Button>
        </div>
      </Link>
    </article>
  );
}

import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default async function BookCard({book}:{book:bookType}) {
  return (
    <article className="group">
      <div
        className={`relative aspect-[3/4] overflow-hidden p-6 ${book.coverImage}`}
      >
        {book.coverImage && 

            <Image
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
        }
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-border py-5">
        <div>
          <h3 className="font-heading text-2xl leading-tight tracking-[-0.03em]">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
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
    </article>
  );
}

import {
  BookOpen,
  CalendarDays,
  Library,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { email, json } from "better-auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BorrowBookButton from "@/components/Books/BorrowBookButton";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let book;

  try {
    const response = await fetch(
      `http://localhost:5000/book/${id}`,
      { cache: "no-store" }
    );

    if (response.status === 404) {
      notFound();
    }
    
    if (!response.ok) {
      notFound();
    }

    book = await response.json();
  } catch (error) {
    throw error;
  }

  if (!book) {
    notFound();
  }

  

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
      <article className="grid gap-12 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-20">
        <div className="relative aspect-[3/4] overflow-hidden border border-border bg-[#c6b59a]">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="object-cover aspect-[3/4] h-full w-auto"
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-8 text-[#29241e]">
              <div className="flex items-start justify-between text-xs uppercase tracking-[0.18em]">
                <span>BookNook</span>
                <span>{book.publishedYear}</span>
              </div>

              <div>
                <BookOpen className="mb-6 size-12 stroke-[1.2]" />
                <p className="max-w-[16rem] font-heading text-6xl leading-[0.88] tracking-[-0.06em]">
                  {book.title}
                </p>
              </div>

              <p className="text-xs uppercase tracking-[0.15em]">
                {book.category}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Book record
          </p>

          <h1 className="max-w-3xl font-heading text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">
            {book.title}
          </h1>

          <p className="mt-6 text-xl text-muted-foreground">
            {book.author}
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-5">
            <div className="flex flex-col gap-2">
              <CalendarDays className="size-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Published
              </span>
              <span>{book.publishedYear}</span>
            </div>

            <div className="flex flex-col gap-2">
              <BookOpen className="size-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Category
              </span>
              <span>{book.category}</span>
            </div>

            <div className="flex flex-col gap-2">
              <UserRound className="size-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Language
              </span>
              <span>{book.language}</span>
            </div>

            <div className="flex flex-col gap-2">
              <Library className="size-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Available
              </span>
              <span>{book.availableCopies} copies</span>
            </div>

            {(book.ownerName || book.ownerEmail) && (
              <div className="flex flex-col gap-2">
                <UserRound className="size-4 text-primary" />
                <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Owner
                </span>
                <span className="text-sm">
                  {book.ownerName || "N/A"}
                  {book.ownerEmail && (
                    <span className="block text-xs text-muted-foreground">
                      {book.ownerEmail}
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            {book.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <BorrowBookButton availableCopies={book.availableCopies} id={id as string}/>

            <p className="flex items-center text-sm text-muted-foreground">
              Borrowing is available for up to 14 days.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
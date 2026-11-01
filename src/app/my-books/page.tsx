import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

import BookCard from "@/components/Books/BookCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { error } from "next/dist/build/output/log";

export default async function MyBooksPage() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const ownerEmail = session?.user.email
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-books/${ownerEmail}`)
  const books = await res.json()
  if(!res.ok){
    throw error("something went worng")
  }
  if (!session?.user) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-xl border border-dashed border-border p-8">
          <BookOpen className="mb-5 size-8 text-primary" />
          <h1 className="font-heading text-5xl tracking-[-0.05em]">
            Your shelf is private.
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            Sign in to see the books you added to BookNook.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <Link
        href="/books"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Browse all books
      </Link>

      <div className="mb-14 border-b border-border pb-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Your collection
        </p>
        <h1 className="font-heading text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">
          My books.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Books added by {session.user.name || session.user.email}.
        </p>
      </div>

      {books.length === 0 ? (
        <p className="border border-dashed border-border p-8 text-muted-foreground">
          You have not added any books yet.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book:bookType) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}

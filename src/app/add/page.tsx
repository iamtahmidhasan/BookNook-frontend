"use client";

import { ArrowLeft, BookPlus, Link2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { object } from "better-auth";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";

type BookForm = {
  title: string;
  author: string;
  descriptio: string;
  isbn: string;
  coverImage: string;
  category: string;
  language: string;
  publishedYear: string;
  totalCopies: string;
};

const initialForm: BookForm = {
  title: "",
  author: "",
  descriptio: "",
  isbn: "",
  coverImage: "",
  category: "",
  language: "English",
  publishedYear: "",
  totalCopies: "1",
};

export default function AddBookPage() {

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
      event.preventDefault()
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData)
      console.log(data)
      const { data: session, error } = await authClient.getSession()
      console.log("user id is here",session?.user.name)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data, 
          ownerName: session?.user.name,
          ownerEmail: session?.user.email,
        }),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error(`The books API responded with ${response.status}.`);
      }
    }


  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-10">
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to all books
        </Link>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Grow the collection
        </p>
        <h1 className="font-heading text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">
          Add a book.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
          Add a new title to the BookNook shelf for readers to discover.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-border bg-card p-6 shadow-[10px_10px_0_var(--border)] sm:p-10"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="field-label">Title</span>
            <input
              required
              name="title"
              className="field-input"
              placeholder="The Great Gatsby"
            />
          </label>

          <label>
            <span className="field-label">Author</span>
            <input
              required
              name="author"
              className="field-input"
              placeholder="F. Scott Fitzgerald"
            />
          </label>

          <label>
            <span className="field-label">Category</span>
            <input
              required
              name="category"
              className="field-input"
              placeholder="Classic fiction"
            />
          </label>

          <label>
            <span className="field-label">ISBN</span>
            <input
              required
              name="isbn"
              className="field-input"
              placeholder="9780743273565"
            />
          </label>

          <label>
            <span className="field-label">Language</span>
            <input
              required
              name="language"
              className="field-input"
              placeholder="English"
            />
          </label>

          <label>
            <span className="field-label">Published year</span>
            <input
              required
              min="0"
              name="publishedYear"
              type="number"
              className="field-input"
              placeholder="1925"
            />
          </label>

          <label>
            <span className="field-label">Total copies</span>
            <input
              required
              min="1"
              name="totalCopies"
              type="number"
              className="field-input"
              placeholder="5"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="field-label">Cover image URL</span>
            <span className="relative block">
              <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="coverImage"
                required
                type="url"
                className="field-input pl-10"
                placeholder="https://example.com/book-cover.jpg"
              />
            </span>
          </label>

          <label className="sm:col-span-2">
            <span className="field-label">Description</span>
            <textarea
              required
              name="description"
              rows={5}
              className="field-input h-auto resize-y py-3"
              placeholder="What makes this book worth reading?"
            />
          </label>
        </div>

        {/* {message && (
          <p role="status" className="mt-6 border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
            {message}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-6 border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </p>
        )}
          */}
        <Button
          type="submit"
          size="lg"
          className="mt-8 h-12 w-full sm:w-auto"
        >
          <BookPlus />
          Add to shelf
        </Button> 
      </form>

      <style jsx>{`
        .field-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--muted-foreground);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .field-input {
          width: 100%;
          border: 1px solid var(--input);
          background: var(--background);
          padding: 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .field-input:focus {
          border-color: var(--ring);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 20%, transparent);
        }
      `}</style>
    </section>
  );

}
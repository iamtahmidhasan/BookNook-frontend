import { ArrowLeft, BookOpen, CalendarDays } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

import ReturnBorrowBookButton from "@/components/Books/ReturnBorrowBookButton";
import { auth } from "@/lib/auth";

type BorrowRecord = {
  _id?: string;
  bookId?: string;
  title?: string;
  bookTitle?: string;
  author?: string;
  borrowedAt?: string;
  dueDate?: string;
  status?: string;
  quantity?: number;
};

type BookDetails = {
  _id?: string;
  title?: string;
  author?: string;
  descriptio?: string;
  coverImage?: string;
  category?: string;
  language?: string;
  publishedYear?: number;
  availableCopies?: number;
};

type BorrowedBook = {
  borrow: BorrowRecord;
  book: BookDetails | null;
  quantity: number;
};

function formatDate(value?: string) {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

export default async function MyBorrowsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-xl border border-dashed border-border p-8">
          <BookOpen className="mb-5 size-8 text-primary" />
          <h1 className="font-heading text-5xl tracking-[-0.05em]">
            Your borrowed books are private.
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            Sign in to see the books you are currently borrowing.
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

  let borrowedBooks: BorrowedBook[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/borrows/${encodeURIComponent(session.user.email)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`The borrows API responded with ${response.status}.`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("The borrows API returned an invalid response.");
    }

    const borrows = data as BorrowRecord[];
    const groupedBorrows = new Map<string, BorrowedBook>();

    borrows.forEach((borrow, index) => {
      const key = borrow.bookId || `borrow-${index}`;
      const existing = groupedBorrows.get(key);

      if (existing) {
        existing.quantity += Number(borrow.quantity) || 1;
      } else {
        groupedBorrows.set(key, {
          borrow,
          book: null,
          quantity: Number(borrow.quantity) || 1,
        });
      }
    });

    borrowedBooks = await Promise.all(
      Array.from(groupedBorrows.values()).map(async (borrowedBook) => {
        if (!borrowedBook.borrow.bookId) {
          return borrowedBook;
        }

        const bookResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/book/${encodeURIComponent(borrowedBook.borrow.bookId)}`,
          { cache: "no-store" },
        );

        if (!bookResponse.ok) {
          console.error(
            `Failed to load book ${borrowedBook.borrow.bookId}: ${bookResponse.status}`,
          );
          return borrowedBook;
        }

        return {
          borrow: borrowedBook.borrow,
          book: (await bookResponse.json()) as BookDetails | null,
          quantity: borrowedBook.quantity,
        };
      }),
    );
  } catch (error) {
    console.error("Failed to load borrowed books.", error);

    return (
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="border border-destructive/40 bg-destructive/5 p-8 text-destructive">
          We could not load your borrowed books. Please try again shortly.
        </p>
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
          Your reading list
        </p>
        <h1 className="font-heading text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">
          My borrows.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Books currently borrowed by {session.user.name || session.user.email}.
        </p>
      </div>

      {borrowedBooks.length === 0 ? (
        <div className="border border-dashed border-border p-8">
          <BookOpen className="mb-4 size-7 text-primary" />
          <p className="text-muted-foreground">
            You do not have any borrowed books yet.
          </p>
          <Link
            href="/books"
            className="mt-5 inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Find a book to borrow
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {borrowedBooks.map(({ borrow, book, quantity }, index) => (
            <article
              key={borrow._id || `${borrow.bookId}-${index}`}
              className="border border-border bg-card p-6"
            >
              <div className="flex gap-5">
                {book?.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={`Cover of ${book.title || borrow.title || "borrowed book"}`}
                    className="h-32 w-20 shrink-0 object-cover"
                  />
                ) : (
                  <div className="flex h-32 w-20 shrink-0 items-center justify-center bg-[#c6b59a] text-[#29241e]">
                    <BookOpen className="size-7" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    Borrowed book
                  </p>
                  <Link href={`/book/${book?._id}`}>
                  
                  
                  <h2 className="mt-3 font-heading text-3xl leading-tight tracking-[-0.04em]">
                    {book?.title ||
                      borrow.title ||
                      borrow.bookTitle ||
                      "Book record"}
                  </h2>
                  </Link>
                  <p className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    Quantity: {quantity}
                  </p>
                  {(book?.author || borrow.author) && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {book?.author || borrow.author}
                    </p>
                  )}
                </div>
              </div>

              {book && (
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Category</p>
                    <p className="mt-1">{book.category || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      Published
                    </p>
                    <p className="mt-1">{book.publishedYear || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      Language
                    </p>
                    <p className="mt-1">{book.language || "—"}</p>
                  </div>
                </div>
              )}

              {book?.descriptio && (
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {book.descriptio}
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
                <div>
                  <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    Borrowed
                  </p>
                  <p>{formatDate(borrow.borrowedAt)}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    Due date
                  </p>
                  <p>{formatDate(borrow.dueDate)}</p>
                </div>
              </div>

              {borrow.bookId && (
                <p className="mt-5 truncate text-xs text-muted-foreground">
                  Book ID: {borrow.bookId}
                </p>
              )}

              {borrow.bookId && (
                <ReturnBorrowBookButton id={borrow.bookId} quantity={quantity} />
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Book = {
  _id?: string;
  ownerEmail?: string;
  title?: string;
  author?: string;
  description?: string;
  descriptio?: string;
  isbn?: string;
  coverImage?: string;
  category?: string;
  language?: string;
  publishedYear?: number;
};

type EditBookProps = {
  book: Book;
  id: string;
};

const fields = [
  ["title", "Title"],
  ["author", "Author"],
  ["isbn", "ISBN"],
  ["category", "Category"],
  ["language", "Language"],
  ["publishedYear", "Published year"],
] as const;

export default function EditBook({ book, id }: EditBookProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    title: book.title || "",
    author: book.author || "",
    isbn: book.isbn || "",
    category: book.category || "",
    language: book.language || "",
    publishedYear: String(book.publishedYear || ""),
    coverImage: book.coverImage || "",
    description: book.description || book.descriptio || "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      const { data: session } = await authClient.getSession();
      if (session?.user?.email !== book.ownerEmail) {
        throw new Error("Only the book owner can edit this book.");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          publishedYear: Number(form.publishedYear),
          ownerEmail: session?.user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error(`The update API responded with ${response.status}.`);
      }

      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update book.", error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="lg"
            className="h-12 gap-2 px-6 uppercase tracking-[0.08em]"
          >
            <Pencil aria-hidden="true" />
            Edit book
          </Button>
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
          <DialogDescription>Update this book&apos;s information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          {fields.map(([field, label]) => (
            <label key={field} className="grid gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </span>
              <input
                required
                type={field === "publishedYear" ? "number" : "text"}
                value={form[field]}
                onChange={(event) => updateField(field, event.target.value)}
                className="h-10 border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </label>
          ))}

          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Cover image URL
            </span>
            <input
              required
              type="url"
              value={form.coverImage}
              onChange={(event) => updateField("coverImage", event.target.value)}
              className="h-10 border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Description
            </span>
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              className="resize-y border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </label>

          <DialogFooter className="sm:col-span-2">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

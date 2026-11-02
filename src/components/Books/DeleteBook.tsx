"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import GetTokenFromClient from "./GetTokenFromClient";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteBookProps = {
  id: string;
  ownerEmail?: string;
};

export default function DeleteBook({ id, ownerEmail }: DeleteBookProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const { data: session } = await authClient.getSession();
    const jwtToken = await GetTokenFromClient();
    if (session?.user?.email !== ownerEmail || !jwtToken) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`The delete API responded with ${response.status}.`);
      }

      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete book.", error);
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="destructive"
            size="lg"
            className="h-12 gap-2 px-6 uppercase tracking-[0.08em]"
            disabled={isDeleting}
          />
        }
      >
        <Trash2 aria-hidden="true" />
        {isDeleting ? "Deleting..." : "Delete book"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this book?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The book will be removed from the library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete book
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

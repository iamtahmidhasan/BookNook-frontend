"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

type ReturnBorrowBookButtonProps = {
  id: string;
  quantity: number;
};

export default function ReturnBorrowBookButton({
  id,
  quantity: maxQuantity,
}: ReturnBorrowBookButtonProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(maxQuantity);
  const [isReturning, setIsReturning] = useState(false);

  function handleQuantityChange(value: string) {
    const nextQuantity = Number(value);

    if (!Number.isFinite(nextQuantity)) {
      return;
    }

    setQuantity(Math.min(Math.max(nextQuantity, 1), maxQuantity));
  }

  async function handleReturn() {
    if (quantity < 1 || quantity > maxQuantity) {
      return;
    }

    const { data: session, error: sessionError } =
      await authClient.getSession();

    if (sessionError || !session?.user) {
      toast.add({
        title: "Unable to return book",
        description: "Please sign in again and try once more.",
        type: "error",
      });
      return;
    }

    setIsReturning(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/return`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.name,
          email: session.user.email,
          bookId: id,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`The return API responded with ${response.status}.`);
      }

      toast.add({
        title: "Book returned",
        description: `Returned ${quantity} ${quantity === 1 ? "copy" : "copies"}.`,
        type: "success",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to return book.", error);
      toast.add({
        title: "Unable to return book",
        description: "Please try again shortly.",
        type: "error",
      });
    } finally {
      setIsReturning(false);
    }
  }

  return (
    <div className="mt-6 flex items-end gap-3">
      <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Return quantity
        <input
          type="number"
          min={1}
          max={maxQuantity}
          value={quantity}
          onChange={(event) => handleQuantityChange(event.target.value)}
          disabled={isReturning}
          aria-label="Return quantity"
          className="h-10 w-24 border border-input bg-background px-3 text-center text-base text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </label>
      <Button
        type="button"
        variant="outline"
        onClick={handleReturn}
        disabled={isReturning || quantity < 1}
        className="h-10"
      >
        {isReturning ? "Returning..." : "Return book"}
      </Button>
    </div>
  );
}

"use client"
import { authClient } from "@/lib/auth-client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import GetTokenFromClient from "./GetTokenFromClient";

export default function BorrowBookButton({id,availableCopies}:{id:string, availableCopies: number}) {
    const router = useRouter();
    const [quantity, setQuantity] = React.useState(availableCopies > 0 ? 1 : 0);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextQuantity = Number(event.target.value);

      if (!Number.isFinite(nextQuantity)) {
        return;
      }

      setQuantity(Math.min(Math.max(nextQuantity, 1), availableCopies));
    };
    
    function showToast() {
    const id = toast.add({
      title: "Successfully Borrowed",
    //   description: "",
    })}

    const handleBorrow = async() =>{
    const { data: session, error } = await authClient.getSession()
    const jwtToken = await GetTokenFromClient();

    if (error || !session?.user || !jwtToken || quantity < 1 || quantity > availableCopies) {
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`,{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        user:session?.user.name,
        email: session?.user.email,
        bookId: id,
        quantity,
      })
    })
    if(res.ok){
        showToast()
        router.refresh();
    }
    console.log(res)
  }
  return (
    <div className="flex items-end gap-3">
      <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Quantity
        <input
          type="number"
          min={availableCopies > 0 ? 1 : 0}
          max={availableCopies}
          value={quantity}
          onChange={handleQuantityChange}
          disabled={availableCopies <= 0}
          aria-label="Borrow quantity"
          className="h-12 w-20 border border-input bg-background px-3 text-center text-base text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </label>
      <Button onClick={handleBorrow} disabled={availableCopies<=0 || quantity < 1} size="lg" className="h-12 px-7">
        Borrow this book
      </Button>
    </div>
  );
}

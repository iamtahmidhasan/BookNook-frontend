"use client"

import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GitBranch, LockKeyhole, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export default function LoginPage() {
  const handleGithubSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      console.error("GitHub sign-in failed.", error);
      toast.add({
        title: "Unable to sign in with GitHub",
        description: error.message || "Please try again.",
        type: "error",
      });
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    function showToast() {
    const id = toast.add({
      title: "Welcome back",
    //   description: "",
    })}
    e.preventDefault()
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as {email:string,password:string}
        console.log(user)
        const {data,error} = await authClient.signIn.email({
            ...user
        })
        if(data){
            console.log(data)
            showToast()
            redirect("/")
        }
        if(error){
            console.log(error)
            toast.add({
              title: "Sign in failed",
              description: error.message || "Check your email and password.",
              type: "error",
            });
        }
  };
  return (
      <section className="mx-auto flex w-full max-w-7xl justify-center px-6 py-16 lg:px-10 lg:py-24">
        <div className="w-full max-w-md border border-border bg-card p-6 shadow-[10px_10px_0_var(--border)] sm:p-10">
      <div className="mb-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          BookNook members
        </p>
        <h1 className="font-heading text-5xl leading-[0.92] tracking-[-0.06em]">
          Welcome back.
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
            Sign in to browse, borrow, and manage your books.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>

        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Email
          </span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-11 w-full border border-input bg-background pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Password
          </span>
          <span className="relative block">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              required
              minLength={8}
              type="password"
              name="password"
              placeholder="At least 8 characters"
              className="h-11 w-full border border-input bg-background pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </span>
        </label>

        {/* {error && (
          <p role="alert" className="border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </p>
        )} */}

        <Button type="submit" size="lg" className="h-11 w-full" >
          Sign in
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        Or continue with
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 w-full"
        onClick={handleGithubSignIn}
      >
        <GitBranch />
        GitHub
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to BookNook?
        <Link
          href={"/signup"}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
      </section>
  );
}

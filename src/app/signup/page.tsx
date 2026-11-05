"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  GitBranch,
  LinkIcon,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "@/components/ui/toast";

export default function SignupPage() {
  const handleGithubSignUp = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      console.error("GitHub sign-up failed.", error);
      toast.add({
        title: "Unable to sign up with GitHub",
        description: error.message || "Please try again.",
        type: "error",
      });
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };
    console.log(user);
    const { data, error } = await authClient.signUp.email({ ...user });
    if (data) {
      console.log(data);
      toast.add({
        title: "Account created",
        description: "Welcome to BookNook.",
        type: "success",
      });
      redirect("/");
    }
    if (error) {
      console.log(error);
      toast.add({
        title: "Sign up failed",
        description: error.message || "Please check your information and try again.",
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
            Join the shelf.
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            Create an account to borrow books and keep track of your reading.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Name
            </span>
            <span className="relative block">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                type="text"
                placeholder="Your name"
                name="name"
                className="h-11 w-full border border-input bg-background pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Email
            </span>
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
                className="h-11 w-full border border-input bg-background pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Avatar URL
            </span>
            <span className="relative block">
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                name="image"
                type="url"
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
                name="password"
                type="password"
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
          <Button type="submit" size="lg" className="h-11 w-full">
            Create account
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
            onClick={handleGithubSignUp}
        >
          <GitBranch />
          GitHub
        </Button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?
          <Link
            href={"/login"}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

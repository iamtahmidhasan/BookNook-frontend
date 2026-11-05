import { ArrowRight, BookMarked, BookOpen, Plus, UserRound } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";

const accountLinks = [
  {
    href: "/my-books",
    title: "My books",
    description: "Manage the books you have added to the shelf.",
    icon: BookOpen,
  },
  {
    href: "/my-borrows",
    title: "My borrows",
    description: "Review borrowed books, due dates, and returns.",
    icon: BookMarked,
  },
  {
    href: "/add",
    title: "Add a book",
    description: "Share a new title with the BookNook community.",
    icon: Plus,
  },
];

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-xl border border-dashed border-border p-8">
          <UserRound className="mb-5 size-8 text-primary" />
          <h1 className="font-heading text-5xl tracking-[-0.05em]">
            Your account is private.
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            Sign in to manage your BookNook profile and reading activity.
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

  const userName = session.user.name || "Reader";
  const initials = userName.charAt(0).toUpperCase();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-14 border-b border-border pb-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Your BookNook
        </p>
        <h1 className="font-heading text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">
          Account.
        </h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border border-border bg-card p-8">
          <Avatar className="size-20">
            <AvatarImage src={session.user.image || undefined} alt={userName} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <h2 className="mt-6 font-heading text-3xl tracking-[-0.04em]">
            {userName}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{session.user.email}</p>
        </div>

        <div>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Quick links
          </p>
          <div className="grid border-t border-border">
            {accountLinks.map(({ href, title, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-5 border-b border-border py-6 transition-colors hover:bg-muted"
              >
                <Icon className="size-6 shrink-0 text-primary" />
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-2xl">{title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {description}
                  </span>
                </span>
                <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

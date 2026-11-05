"use client";

import { Menu, Moon, Search, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Links = [
  {
    id: 1,
    text: "Browse All",
    href: "/books",
  },
];
const protectedLink = [
  {
    id: 1,
    text: "My Books",
    href: "/my-books",
  },
  {
    id: 2,
    text: "Add Books",
    href: "/add",
  },
  {
    id: 3,
    text: "My borrows",
    href: "/my-borrows",
  },
];

export default function Header() {
  const { data: session } = useSession();
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const userName = session?.user?.name || session?.user?.email || "Reader";
  const initials = userName.charAt(0);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <header
      className={`${
        isHomePage ? "fixed" : "sticky"
      } top-0 z-50 w-full border-b text-foreground transition-colors duration-300 ${
        isHomePage && !isScrolled && !isMenuOpen
          ? "border-transparent bg-transparent text-white"
          : "border-border/80 bg-background/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="font-heading text-2xl font-semibold tracking-[-0.04em]"
        >
          BookNook<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm opacity-80 md:flex">
          {Links.map((link) => (
            <Link
              key={link.id}
              className="transition-colors hover:opacity-100"
              href={link.href}
            >
              {link.text}
            </Link>
          ))}
          {
            session?.user && protectedLink.map((link) => (
            <Link
              key={link.id}
              className="transition-colors hover:opacity-100"
              href={link.href}
            >
              {link.text}
            </Link>
          ))
          }
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="border-current/40"
            render={<Link href="/search" aria-label="Search library" />}
          >
            <Search />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="border-current/40"
            aria-label="Toggle theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Sun className="hidden dark:block" />
            <Moon className="block dark:hidden" />
          </Button>

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open account menu"
                >
                  <Avatar>
                    <AvatarImage
                      src={session.user.image || undefined}
                      alt={userName}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <span className="block truncate font-medium text-foreground">
                    {userName}
                  </span>
                  <span className="block truncate">{session.user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-books">My books</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-borrows">My Borrows</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/add">Add books</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={handleSignOut}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="px-3 py-2 text-sm opacity-80 transition-opacity hover:opacity-100"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Join BookNook
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden border border-border"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="min-h-[calc(100dvh-32px)] overflow-y-auto border-t border-border/80 bg-background px-6 py-8 md:hidden">
          <nav className="flex min-h-[calc(100dvh-137px)] flex-col gap-2">
            {Links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-border/60 px-3 py-5 font-heading text-3xl tracking-[-0.03em] text-foreground transition-colors hover:text-primary"
              >
                {link.text}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-border/60 px-3 py-5 font-heading text-3xl tracking-[-0.03em] text-foreground transition-colors hover:text-primary"
            >
              Search library
            </Link>
            {!session?.user && (
              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-8">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-12 items-center justify-center border border-border text-sm font-medium transition-colors hover:bg-muted"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-12 items-center justify-center bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Join BookNook
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

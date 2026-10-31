import { Search } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
const Links = [
  {
    id:1,
    text: "Browse All",
    href: "/books",
  },
  {
    id:2,
    text: "My Books",
    href: "/books",
  },
];
export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-border/80 px-6 py-5 lg:px-10">
      <Link
        href="/"
        className="font-heading text-2xl font-semibold tracking-[-0.04em]"
      >
        BookNook<span className="text-primary">.</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        {Links.map((link) => {
          return (
            <Link
              key={link.id}
              className="transition-colors hover:text-foreground"
              href={link.href}
            >
              {link.text}
            </Link>
          );
        })}
      </nav>
      <Button variant="outline" size="lg" className="hidden sm:inline-flex">
        <Search />
        Search library
      </Button>
    </header>
  );
}

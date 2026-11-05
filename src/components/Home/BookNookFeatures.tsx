import { ArrowRight, BookMarked, Library, Plus } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Library,
    title: "Browse the shelf",
    text: "Explore every available title and find your next good read.",
    href: "/books",
  },
  {
    icon: BookMarked,
    title: "Track your borrows",
    text: "See what you are reading, check due dates, and return books easily.",
    href: "/my-borrows",
  },
  {
    icon: Plus,
    title: "Build the collection",
    text: "Add your own books and share them with the BookNook community.",
    href: "/add",
  },
];

export default function BookNookFeatures() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-col justify-between gap-10 border-b border-border pb-10 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Everything in one place
          </p>
          <h2 className="font-heading text-5xl leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            Make BookNook yours.
          </h2>
        </div>
        <p className="max-w-sm text-lg leading-8 text-muted-foreground">
          Find, share, and keep track of the stories that stay with you.
        </p>
      </div>

      <div className="grid md:grid-cols-3">
        {features.map(({ icon: Icon, title, text, href }, index) => (
          <Link
            key={title}
            href={href}
            className="group border-b border-border px-1 py-8 transition-colors hover:bg-muted md:border-r md:px-6 md:last:border-r-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">0{index + 1}</span>
              <Icon className="size-6 text-primary" />
            </div>
            <h3 className="mt-12 flex items-center justify-between gap-4 font-heading text-3xl">
              {title}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              {text}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

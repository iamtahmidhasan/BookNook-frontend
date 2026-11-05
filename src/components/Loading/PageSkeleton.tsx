import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="w-full">
      <Skeleton className="h-[calc(100vh-85px)] w-full rounded-none" />
    </section>
  );
}

export function BookGridSkeleton() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="mb-16 space-y-5 border-b border-border pb-10">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-20 w-72 sm:w-[30rem]" />
        <Skeleton className="h-6 w-full max-w-xl" />
      </div>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-5">
            <Skeleton className="aspect-[3/4] w-full rounded-none" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FormSkeleton() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-10 space-y-5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-20 w-72 sm:w-[28rem]" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="grid gap-5 border border-border p-6 sm:grid-cols-2 sm:p-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={index > 5 ? "sm:col-span-2" : ""}>
            <Skeleton className="mb-2 h-3 w-24" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}
        <Skeleton className="h-12 w-36" />
      </div>
    </section>
  );
}

export function AccountSkeleton() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-14 space-y-5 border-b border-border pb-10">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-20 w-64 sm:w-80" />
      </div>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5 border border-border p-8">
          <Skeleton className="size-20 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-4 w-28" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailSkeleton() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-20">
        <Skeleton className="aspect-[3/4] w-full rounded-none" />
        <div className="flex flex-col justify-center space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full max-w-3xl" />
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-28 w-full max-w-xl" />
          <Skeleton className="h-24 w-full max-w-2xl" />
          <Skeleton className="h-12 w-48" />
        </div>
      </div>
    </section>
  );
}

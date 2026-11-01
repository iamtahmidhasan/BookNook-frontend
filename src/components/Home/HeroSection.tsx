
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import React from 'react'
import * as motion from "motion/react-client";
import { Button } from '../ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-85px)] w-full max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.div
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles className="size-4" />
            A small library for big curiosities
          </motion.div>
          <motion.h1
            className="max-w-3xl font-heading text-6xl leading-[0.93] tracking-[-0.06em] text-foreground sm:text-8xl lg:text-[8.5rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <span className="block">
              <span className="max-w-full overflow-visible!">Find your next</span>
            </span>
            <span className="block">
              <span className="max-w-full overflow-visible! text-primary">good read.</span>
            </span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Browse a thoughtful collection, borrow a book for a few days, and
            keep your reading life in one quiet place.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link  href="/books" className="h-12 text-white dark:text-black px-6 text-sm border border-border flex rounded-md bg-primary items-center justify-center gap-3">
              Explore the collection
              <ArrowRight />
            </Link>
            <Link  href="/signup" className="h-12 px-6 text-sm border border-border flex rounded-md items-center justify-center gap-3">
              Join BookNook
              <BookOpen />
            </Link>
          </motion.div>
          <motion.div
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div>
              <p className="font-heading text-3xl tracking-[-0.04em]">1,240</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Books on the shelf
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl tracking-[-0.04em]">14 days</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Borrowing window
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl tracking-[-0.04em]">24/7</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Open online
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, x: 32, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
        >
          <div className="absolute -left-5 -top-5 size-24 rounded-full border border-primary/30" />
          <div className="absolute -bottom-6 -right-4 size-32 rounded-full bg-primary/10" />
          <div className="relative rotate-2 border border-border bg-card p-3 shadow-[12px_14px_0_var(--border)]">
            <div className="flex aspect-[4/5] flex-col justify-between bg-[#d7c6a9] p-7 text-[#29241e] sm:p-10">
              <div className="flex items-start justify-between text-xs uppercase tracking-[0.2em]">
                <span>BookNook</span>
                <span>Vol. 01</span>
              </div>
              <div>
                <BookOpen className="mb-6 size-12 stroke-[1.2]" />
                <p className="font-heading text-6xl leading-[0.85] tracking-[-0.07em] sm:text-8xl">
                  The
                  <br />
                  open
                  <br />
                  shelf
                </p>
              </div>
              <div className="flex items-end justify-between border-t border-[#29241e]/30 pt-4 text-xs uppercase tracking-[0.16em]">
                <span>Read widely</span>
                <span>2024</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -left-8 max-w-[190px] border border-border bg-card p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Currently popular
            </p>
            <p className="mt-2 font-heading text-xl leading-tight">
              The books that stay with us
            </p>
            <a
              href="#browse"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary"
            >
              Browse picks <ArrowRight className="size-3" />
            </a>
          </div>
        </motion.div>
      </section>
  )
}

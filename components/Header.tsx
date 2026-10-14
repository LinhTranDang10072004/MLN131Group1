"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { href: "#co-hoi", label: "Thời cơ" },
  { href: "#thach-thuc", label: "Thách thức" },
  { href: "#giai-phap", label: "Giải pháp" },
  { href: "#flashcard", label: "Flashcard" },
  { href: "#quiz", label: "Trắc nghiệm" },
];

export default function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3">
          <span className="bg-accent px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white">
            Group 5
          </span>
          <span className="hidden h-5 w-px bg-line sm:block" />
          <span className="font-serif text-lg font-semibold tracking-tight">Thời cơ &amp; Thách thức</span>
        </a>
        <nav className="hidden gap-7 text-sm text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <motion.div
        style={{ scaleX }}
        className="h-[2px] origin-left bg-accent"
      />
    </header>
  );
}

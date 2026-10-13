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
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight">
          Thời cơ &amp; Thách thức
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

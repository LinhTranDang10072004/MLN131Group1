"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { flashcards, type Card } from "@/lib/data";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards() {
  const [deck, setDeck] = useState<Card[]>(flashcards);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (step: number) => {
      setDir(step);
      setFlipped(false);
      setI((p) => (p + step + deck.length) % deck.length);
    },
    [deck.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " " && (e.target as HTMLElement).tagName !== "BUTTON") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const card = deck[i];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm text-muted">
        <span>
          Thẻ {i + 1} / {deck.length}
        </span>
        <button
          onClick={() => {
            setDeck(shuffle(flashcards));
            setI(0);
            setFlipped(false);
          }}
          className="underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          Xáo trộn
        </button>
      </div>

      <div className="mb-6 h-[2px] w-full bg-line">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${((i + 1) / deck.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="relative h-72 [perspective:1400px] sm:h-80">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`${i}-${card.front}`}
            custom={dir}
            initial={{ opacity: 0, x: 40 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 * dir }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0"
          >
            <motion.button
              onClick={() => setFlipped((f) => !f)}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative h-full w-full cursor-pointer text-left"
              aria-label="Lật thẻ"
            >
              <div
                className="absolute inset-0 flex flex-col justify-between border border-line bg-white p-8"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <span className="text-xs uppercase tracking-[0.18em] text-muted">Câu hỏi</span>
                <p className="font-serif text-2xl leading-snug sm:text-[1.7rem]">{card.front}</p>
                <span className="text-xs text-muted">Nhấn để xem đáp án</span>
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-between bg-accent p-8 text-white"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-xs uppercase tracking-[0.18em] text-white/70">Đáp án</span>
                <p className="text-lg leading-relaxed">{card.back}</p>
                <span className="text-xs text-white/70">Nhấn để quay lại</span>
              </div>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          className="border border-ink px-6 py-2.5 text-sm transition-colors hover:bg-ink hover:text-paper"
        >
          ← Trước
        </button>
        <span className="hidden text-xs text-muted sm:block">
          Phím ← → để chuyển, phím cách để lật
        </span>
        <button
          onClick={() => go(1)}
          className="bg-ink px-6 py-2.5 text-sm text-paper transition-colors hover:bg-accent"
        >
          Sau →
        </button>
      </div>
    </div>
  );
}

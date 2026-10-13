"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quiz } from "@/lib/data";

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quiz[idx];
  const answered = picked !== null;

  const message = useMemo(() => {
    const r = score / quiz.length;
    if (r === 1) return "Xuất sắc, bạn nắm vững toàn bộ nội dung.";
    if (r >= 0.7) return "Tốt, bạn chỉ cần ôn lại một vài ý.";
    if (r >= 0.4) return "Tạm ổn, hãy xem lại flashcard để củng cố thêm.";
    return "Bạn nên đọc lại các phần ở trên rồi thử lại.";
  }, [score]);

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 === quiz.length) {
      setDone(true);
    } else {
      setIdx((p) => p + 1);
      setPicked(null);
    }
  };

  const reset = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="mx-auto max-w-2xl border border-line bg-white p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-6 text-center"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Kết quả</p>
            <p className="mt-3 font-serif text-6xl text-accent">
              {score}/{quiz.length}
            </p>
            <p className="mt-4 text-muted">{message}</p>
            <button
              onClick={reset}
              className="mt-8 bg-ink px-7 py-3 text-sm text-paper transition-colors hover:bg-accent"
            >
              Làm lại
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between text-sm text-muted">
              <span>
                Câu {idx + 1} / {quiz.length}
              </span>
              <span>Điểm: {score}</span>
            </div>
            <div className="mt-3 h-[2px] bg-line">
              <motion.div
                className="h-full bg-accent"
                animate={{ width: `${((idx + (answered ? 1 : 0)) / quiz.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <h3 className="mt-8 font-serif text-2xl leading-snug">{q.q}</h3>

            <div className="mt-6 space-y-3">
              {q.options.map((opt, i) => {
                const isRight = i === q.answer;
                const isPicked = i === picked;
                let style = "border-line hover:border-ink";
                if (answered && isRight) style = "border-emerald-700 bg-emerald-50";
                else if (answered && isPicked) style = "border-accent bg-red-50";
                else if (answered) style = "border-line opacity-60";

                return (
                  <motion.button
                    key={i}
                    whileTap={{ scale: answered ? 1 : 0.99 }}
                    onClick={() => choose(i)}
                    disabled={answered}
                    className={`flex w-full items-start gap-4 border px-5 py-4 text-left text-[0.95rem] transition-colors ${style}`}
                  >
                    <span className="mt-[1px] font-serif text-muted">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
                    <span className="font-medium text-ink">
                      {picked === q.answer ? "Chính xác. " : "Chưa đúng. "}
                    </span>
                    {q.explain}
                  </p>
                  <button
                    onClick={next}
                    className="mt-6 bg-ink px-7 py-3 text-sm text-paper transition-colors hover:bg-accent"
                  >
                    {idx + 1 === quiz.length ? "Xem kết quả" : "Câu tiếp theo →"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

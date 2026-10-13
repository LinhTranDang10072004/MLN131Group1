import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import Flashcards from "@/components/Flashcards";
import Quiz from "@/components/Quiz";
import { opportunities, challenges, solutions, relations, type Item } from "@/lib/data";

const stats = [
  { n: opportunities.length, label: "Thời cơ", href: "#co-hoi" },
  { n: challenges.length, label: "Thách thức", href: "#thach-thuc" },
  { n: solutions.length, label: "Giải pháp", href: "#giai-phap" },
  { n: relations.length, label: "Quan hệ lớn", href: "#giai-phap" },
];

const credits = [
  { label: "Hanoi Skyline – NKS", href: "https://commons.wikimedia.org/wiki/File:Hanoi_Skyline_-_NKS.jpg" },
  {
    label: "Container Ship at the Hai Phong International Container Terminal",
    href: "https://commons.wikimedia.org/wiki/File:Container_Ship_at_the_Hai_Phong_International_Container_Terminal_03.jpg",
  },
  { label: "Street flood in Saigon", href: "https://commons.wikimedia.org/wiki/File:Street_flood_in_Saigon_(10728572006).jpg" },
  { label: "Hanoi, Vietnam, Ba Dinh Square", href: "https://commons.wikimedia.org/wiki/File:Hanoi,_Vietnam,_Ba_Dinh_Square.jpg" },
];

function SectionHead({ no, kicker, title }: { no: string; kicker: string; title: string }) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">
        {no} — {kicker}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

function Caption({
  children,
  dark = false,
  className = "mt-2",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p className={`text-xs ${dark ? "text-white/50" : "text-muted"} ${className}`}>{children}</p>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, n) => (
        <Reveal key={it.title} delay={n * 0.05}>
          <article className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr]">
            <span className="font-serif text-4xl text-line">{String(n + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-serif text-xl font-semibold leading-snug">{it.title}</h3>
              <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-muted">
                {it.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <Reveal>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" />
              Chủ nghĩa xã hội khoa học
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.15] sm:text-5xl">
              Thời cơ và thách thức trên con đường phát triển của Việt Nam
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Trong quá trình phát triển kinh tế và hội nhập quốc tế, Việt Nam vừa đứng trước
              những vận hội lớn để bứt phá, vừa phải đối mặt với nhiều nguy cơ gay gắt nhằm giữ
              vững định hướng xã hội chủ nghĩa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#co-hoi"
                className="bg-ink px-7 py-3 text-sm text-paper transition-colors hover:bg-accent"
              >
                Bắt đầu đọc
              </a>
              <a
                href="#quiz"
                className="border border-ink px-7 py-3 text-sm transition-colors hover:bg-ink hover:text-paper"
              >
                Làm trắc nghiệm
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
              {stats.map((s) => (
                <a key={s.label} href={s.href} className="group">
                  <p className="font-serif text-3xl lining-nums text-accent">{String(s.n).padStart(2, "0")}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-ink">
                    {s.label}
                  </p>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <SmartImage
                src="/images/hero.jpg"
                alt="Toàn cảnh Hà Nội với cầu Nhật Tân"
                className="aspect-[4/5] w-full lg:aspect-auto lg:h-[min(72vh,580px)]"
                position="62% 50%"
                eager
              />
              <figure className="absolute -bottom-8 left-4 max-w-[17rem] border border-line bg-paper p-5 shadow-[0_12px_40px_-12px_rgba(31,27,22,0.35)] sm:-left-8">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-accent">Mục tiêu tổng quát</p>
                <blockquote className="mt-2 font-serif text-lg leading-snug">
                  “Dân giàu, nước mạnh, dân chủ, công bằng, văn minh”
                </blockquote>
              </figure>
            </div>
            <Caption className="mt-12 text-right">Hà Nội và cầu Nhật Tân — Việt Nam trên đà phát triển, hội nhập.</Caption>
          </Reveal>
        </section>

        {/* Thời cơ */}
        <section id="co-hoi" className="border-t border-line bg-paper-deep/60">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHead no="I" kicker="Vận hội lớn" title="Những thời cơ" />
              <Reveal delay={0.1}>
                <SmartImage
                  src="/images/co-hoi.jpg"
                  alt="Tàu container tại Cảng quốc tế Hải Phòng"
                  className="aspect-[4/3] w-full"
                  position="50% 55%"
                />
                <Caption>Cảng container quốc tế Hải Phòng — hội nhập, thương mại và thu hút FDI.</Caption>
              </Reveal>
            </div>
            <ItemList items={opportunities} />
          </div>
        </section>

        {/* Thách thức */}
        <section id="thach-thuc" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1.4fr_1fr]">
            <ItemList items={challenges} />
            <div className="order-first lg:order-last lg:sticky lg:top-28 lg:self-start">
              <SectionHead no="II" kicker="Nguy cơ gay gắt" title="Những thách thức" />
              <Reveal delay={0.1}>
                <SmartImage
                  src="/images/thach-thuc.jpg"
                  alt="Đường phố TP. Hồ Chí Minh ngập nước"
                  className="aspect-[4/3] w-full"
                />
                <Caption>Ngập lụt đô thị — biến đổi khí hậu và an ninh phi truyền thống.</Caption>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Giải pháp */}
        <section id="giai-phap" className="border-t border-line bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal className="mb-12 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-red-300">III — Định hướng</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                Giải pháp để phát triển nhanh, bền vững và giữ vững định hướng XHCN
              </h2>
            </Reveal>

            <Reveal className="mb-12">
              <SmartImage
                src="/images/giai-phap.jpg"
                alt="Quảng trường Ba Đình, Hà Nội"
                className="aspect-[21/9] w-full bg-white/5"
              />
              <Caption dark>Quảng trường Ba Đình — kiên định mục tiêu độc lập dân tộc gắn liền với CNXH.</Caption>
            </Reveal>

            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              {solutions.map((s, n) => (
                <Reveal key={s.title} delay={n * 0.06} className="bg-ink p-8">
                  <span className="font-serif text-3xl text-red-300">{n + 1}</span>
                  <h3 className="mt-3 font-serif text-xl font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{s.points[0]}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16">
              <h3 className="font-serif text-2xl font-semibold">Năm mối quan hệ lớn cần xử lý tốt</h3>
              <ol className="mt-6 divide-y divide-white/15 border-y border-white/15">
                {relations.map((r, n) => (
                  <li key={r} className="flex gap-5 py-4 text-white/85">
                    <span className="font-serif text-red-300">{n + 1}.</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Flashcard */}
        <section id="flashcard" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <SectionHead no="IV" kicker="Ôn tập" title="Flashcard ghi nhớ nhanh" />
            <Reveal>
              <Flashcards />
            </Reveal>
          </div>
        </section>

        {/* Quiz */}
        <section id="quiz" className="border-t border-line bg-paper-deep/60">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <SectionHead no="V" kicker="Kiểm tra" title="Trắc nghiệm củng cố kiến thức" />
            <Reveal>
              <Quiz />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-10 text-center text-sm text-muted">
        <p>Nội dung tham khảo từ Giáo trình Chủ nghĩa xã hội khoa học.</p>
        <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed">
          Ảnh minh họa từ Wikimedia Commons (giấy phép Creative Commons):{" "}
          {credits.map((c, n) => (
            <span key={c.href}>
              <a href={c.href} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-accent">
                {c.label}
              </a>
              {n < credits.length - 1 ? " · " : "."}
            </span>
          ))}
        </p>
      </footer>
    </>
  );
}

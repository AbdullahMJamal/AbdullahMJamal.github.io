"use client";
import { useEffect, useState } from "react";
import Diagram from "./Diagram";
import SearchDemo from "./SearchDemo";
import { stages, type Zone } from "@/lib/content";

const zoneColor: Record<Zone, string> = {
  untrusted: "var(--color-untrusted)",
  model: "var(--color-model)",
  checked: "var(--color-checked)",
};

export default function Story() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.stage));
        });
      },
      { rootMargin: "-42% 0px -48% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const caption = active >= 0 ? stages[active] : null;

  return (
    <>
      {/* phone: compact progress strip */}
      <div className="lg:hidden sticky top-0 z-20 bg-paper/92 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-5 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            {stages.map((s, i) => (
              <span key={s.id} className="h-1.5 flex-1 rounded-full" style={{ background: i <= active ? zoneColor[s.zone] : "var(--color-line)" }} />
            ))}
          </div>
          <p className="mt-1.5 font-display text-sm text-muted truncate">
            {caption ? <><b className="text-ink">{caption.name}.</b> {caption.line}</> : "Scroll to follow an input through the pipeline."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
        <div>
          <section data-stage="-1" className="pt-12 pb-24 lg:pt-16 lg:min-h-[86vh]">
            <h1 className="font-display font-bold tracking-[-0.035em] leading-[0.98] text-[clamp(2.4rem,4.6vw,4rem)] max-w-[11em]">
              I build AI systems that don&rsquo;t trust their own output.
            </h1>
            <p className="mt-6 text-lg text-muted max-w-[32em]">
              <b className="text-ink font-semibold">Abdullah Jamal.</b> AI and full-stack engineer and Certified Ethical Hacker in Karachi. Scroll to follow an input through the pipeline I design around, and see what I have built at each step.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 font-display font-medium text-[0.95rem]">
              <a className="rounded-full bg-ink text-paper px-5 py-2 hover:opacity-85" href="#contact">Contact me</a>
              <a className="underline underline-offset-4 decoration-1 hover:opacity-70" href="#input">See the work &darr;</a>
            </div>
          </section>

          {stages.map((s, i) => (
            <section key={s.id} id={s.id} data-stage={i} className="py-16 lg:py-24 border-t border-line scroll-mt-16 lg:min-h-[80vh]">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm" style={{ color: zoneColor[s.zone] }}>{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display font-bold tracking-tight text-4xl sm:text-5xl">{s.name}</h2>
              </div>

              <p className="mt-6 max-w-[34em] border-l-4 pl-4" style={{ borderColor: zoneColor[s.zone] }}>
                <b className="font-display font-semibold">The risk. </b>{s.risk}
              </p>
              <p className="mt-4 max-w-[34em] pl-5">
                <b className="font-display font-semibold">My rule. </b>{s.rule}
              </p>

              {s.facts && (
                <ul className="mt-8 max-w-[34em] space-y-2 pl-5 list-disc marker:text-model">
                  {s.facts.map((f) => <li key={f}>{f}</li>)}
                </ul>
              )}

              <div className="mt-8">
                {s.projects.map((p) => (
                  <article key={p.name} className="py-6 border-t border-line first:border-t-0">
                    <h3 className="font-display font-semibold text-2xl leading-tight tracking-tight">{p.name}</h3>
                    <div className="text-muted text-[0.95rem]">{p.role}</div>
                    <p className="mt-3 max-w-[36em]">{p.what}</p>
                    <p className="mt-2 text-muted text-[0.93rem]">{p.stack}</p>
                    {p.links.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-display font-semibold text-[0.95rem]">
                        {p.links.map((l) => <a key={l.href} href={l.href} className="underline underline-offset-4 decoration-2" style={{ textDecorationColor: zoneColor[s.zone] }}>{l.label}</a>)}
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {s.id === "retrieve" && <SearchDemo />}
            </section>
          ))}
        </div>

        <aside className="hidden lg:block" aria-label="Pipeline diagram">
          <div className="sticky top-20 pt-6">
            <Diagram active={active} />
            <p className="mt-4 min-h-[3.2em] font-display text-[1.02rem] text-muted">
              {caption ? <><b className="text-ink">{caption.name}.</b> {caption.line}</> : "An input enters at the top. Scroll to follow it."}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

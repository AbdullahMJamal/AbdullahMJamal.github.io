"use client";
import { useState } from "react";
import { DOCS, search } from "@/lib/search";

const chips = ["how do you secure AI systems?", "voice agents", "document extraction", "payments", "blockchain", "cloud"];

export default function SearchDemo() {
  const [q, setQ] = useState(chips[0]);
  const [asked, setAsked] = useState(chips[0]);
  const hits = search(asked);
  const full = 2 / 61;

  return (
    <div className="mt-10 border-t border-line pt-8">
      <h3 className="font-display text-2xl font-bold tracking-tight">Try the retrieve step</h3>
      <p className="mt-1 text-[0.98rem] text-muted max-w-[34em]">
        A small search engine over this site, running in your browser. Each result is ranked by keyword (BM25) and by concept, then the two lists are merged with reciprocal rank fusion. The concept side is a hand-made word map, not a neural model.
      </p>
      <form className="mt-5 flex gap-2 flex-wrap" role="search" onSubmit={(e) => { e.preventDefault(); setAsked(q); }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Ask about my work" placeholder="Ask about my work" className="flex-1 min-w-[220px] bg-paper-2 border border-line rounded-lg px-4 py-3 font-display text-base" />
        <button type="submit" className="rounded-lg bg-ink text-paper font-display font-semibold px-5 py-3 cursor-pointer hover:opacity-90">Search</button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button key={c} type="button" onClick={() => { setQ(c); setAsked(c); }} className="font-display text-sm rounded-full border border-line px-3 py-1 cursor-pointer hover:border-ink">{c}</button>
        ))}
      </div>
      <div className="mt-5 flex gap-5 flex-wrap font-display text-[0.82rem] text-muted">
        <span><i className="inline-block w-2.5 h-2.5 rounded-full bg-ink mr-1.5" />Keyword</span>
        <span><i className="inline-block w-2.5 h-2.5 rounded-full bg-model mr-1.5" />Concept</span>
      </div>
      <ol key={asked} className="mt-2 border-t border-line" aria-live="polite">
        {hits.length === 0 && <li className="py-4 text-muted">Nothing matched. Try voice, security, payments or cloud.</li>}
        {hits.map((h, n) => {
          const d = DOCS[h.i];
          const wk = h.rk ? (1 / (60 + h.rk)) / full * 100 : 0;
          const wc = h.rc ? (1 / (60 + h.rc)) / full * 100 : 0;
          return (
            <li key={d.t} style={{ ["--i" as string]: n }} className="grid grid-cols-[2rem_1fr] sm:grid-cols-[2rem_1fr_150px] gap-x-4 gap-y-2 py-4 border-b border-line">
              <span className="font-display font-bold text-2xl leading-none">{n + 1}</span>
              <div>
                <h4 className="font-display font-semibold text-lg leading-snug">{d.t}</h4>
                <p className="text-[0.95rem] text-muted leading-relaxed">{d.x}</p>
                {d.u && <a className="font-display font-semibold text-sm underline underline-offset-4" href={d.u}>{d.u.startsWith("http") ? "View source" : "Go to section"}</a>}
              </div>
              <div className="col-start-2 sm:col-start-3 pt-1">
                <div className="flex justify-between font-display text-xs text-muted mb-1"><span>Fused</span><span>{h.s.toFixed(4)}</span></div>
                <div className="flex h-2.5 rounded-full overflow-hidden bg-line">
                  <span className="bar block h-full bg-ink" style={{ width: `${wk}%`, ["--i" as string]: n }} />
                  <span className="bar block h-full bg-model" style={{ width: `${wc}%`, ["--i" as string]: n }} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

import Story from "@/components/Story";
import { stack, credentials, links } from "@/lib/content";

function Rows({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl>
      {items.map((r) => (
        <div key={r.k} className="grid sm:grid-cols-[210px_1fr] gap-x-6 gap-y-1 py-3.5 border-t border-line last:border-b">
          <dt className="font-display font-semibold">{r.k}</dt>
          <dd className="text-muted">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 bg-paper border-b border-line"><div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <a href="#top" className="font-display font-bold text-lg tracking-tight">Abdullah Jamal</a>
        <nav className="flex items-center gap-6 font-display font-medium text-[0.95rem] text-muted" aria-label="Main">
          <a className="hover:text-ink hidden sm:inline" href="#input">Pipeline</a>
          <a className="hover:text-ink hidden sm:inline" href="#stack">Stack</a>
          <a className="rounded-full border-[1.5px] border-ink px-4 py-1.5 leading-none text-ink hover:bg-ink hover:text-paper" href="#contact">Contact</a>
        </nav>
      </div></header>

      <main id="top">
        <Story />

        <section id="stack" className="max-w-6xl mx-auto px-5 mt-10 py-20 border-t border-line scroll-mt-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display font-bold tracking-tight text-4xl mb-8">Stack</h2>
              <Rows items={stack} />
            </div>
            <div>
              <h2 className="font-display font-bold tracking-tight text-4xl mb-8">Credentials</h2>
              <Rows items={credentials} />
            </div>
          </div>
        </section>

        <section id="contact" className="bg-ink text-paper scroll-mt-0">
          <div className="max-w-6xl mx-auto px-5 py-20">
            <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-[clamp(2.1rem,5vw,3.6rem)] max-w-[15em]">
              Have something to build, or something to break?
            </h2>
            <p className="mt-5 max-w-[32em] opacity-75">I take on freelance projects and I am open to roles. Karachi time, flexible hours. Email is the quickest way to reach me.</p>
            <div className="mt-8 flex flex-wrap gap-3 font-display font-semibold">
              <a className="rounded-full bg-paper text-ink px-6 py-3 hover:opacity-85" href={`mailto:${links.email}`}>{links.email}</a>
              <a className="rounded-full border-[1.5px] border-paper px-6 py-3 hover:opacity-85" href={links.linkedin}>LinkedIn</a>
              <a className="rounded-full border-[1.5px] border-paper px-6 py-3 hover:opacity-85" href={links.github}>GitHub</a>
              <a className="rounded-full border-[1.5px] border-paper px-6 py-3 hover:opacity-85" href={links.x}>X</a>
              {links.resume && <a className="rounded-full border-[1.5px] border-paper px-6 py-3 hover:opacity-85" href={links.resume}>Resume (PDF)</a>}
            </div>
            <p className="mt-12 text-sm opacity-60 font-display">Abdullah Muhammad Jamal. Karachi, Pakistan.</p>
          </div>
        </section>
      </main>
    </>
  );
}

export interface Doc { t: string; x: string; u: string }
export interface Hit { i: number; s: number; rk?: number; rc?: number }

const gh = (repo: string) => `https://github.com/AbdullahMJamal/${repo}`;

export const DOCS: Doc[] = [
  { t: "Gemini Multimodal Live RAG", x: "Voice and text assistant with ultra-low latency. Python, Vertex AI and the Gemini 2.0 Multimodal Live API with streaming two-way audio pipelines that answer from retrieved documents.", u: gh("gemini-multimodal-live-rag") },
  { t: "Hybrid search with reranking", x: "BM25 keyword search combined with Chroma vector embeddings, then re-ranked with Cohere Rerank-v3 to remove irrelevant context and surface the best passages.", u: gh("Hybrid_Search-Reranking") },
  { t: "FAISS RAG framework", x: "Ten-module retrieval framework on FAISS covering semantic and agentic chunking, multi-query retrieval and reciprocal rank fusion.", u: gh("FAISS-Flow-RAG") },
  { t: "Multi-Modal RAG", x: "Partitions high-resolution PDFs with Unstructured.io, extracts text, HTML tables and images, and summarises them with GPT-4o for retrieval in Chroma.", u: gh("Multi-Modal-RAG") },
  { t: "Enterprise document chatbot", x: "Chat with several PDFs at once and get answers with source citations. Streamlit, LangChain and OpenAI with local FAISS vector storage.", u: gh("Enterprise-RAG-Chatbot") },
  { t: "Vapi voice scheduling agent", x: "Autonomous phone agent that books client appointments and stores them. Built with Vapi, Python, FastAPI and SQLite.", u: gh("Vapi-voice-agent") },
  { t: "Document Data Extractor", x: "n8n workflow that turns a document dropped in Google Drive into a checked row in Google Sheets. It recomputes totals, catches duplicates, scores confidence and sends doubtful results to a review folder. Automation with LlamaParse and OpenAI.", u: gh("n8n-automation-workflows") },
  { t: "Settled", x: "Full-stack SaaS that automates late-fee collection for freelancers. Next.js, TypeScript, Supabase and the Stripe API for payments, with AI-written follow-up emails. Launched in 24 hours at a hackathon.", u: "" },
  { t: "Ownify", x: "Digital passport for real-world assets with tamper-proof cryptographic verification of ownership on the Algorand blockchain. Built as a proof of concept during the Algorand Pakistan Fellowship. I am the founder.", u: gh("Ownify") },
  { t: "Security approach", x: "Certified Ethical Hacker. Penetration testing methodology (VAPT), OWASP Top 10, network security and cryptography. I validate model output with code, keep secrets out of repositories, archive instead of delete, and keep a human on irreversible steps to protect AI systems from abuse and mistakes.", u: "#stack" },
  { t: "Certifications", x: "Certified Ethical Hacker (CEH), Anthropic Claude Certified in agentic workflows and system architecture, official n8n certification, Algorand Pakistan Fellowship graduate, IELTS B2.", u: "#stack" },
  { t: "Education", x: "BS Computer Network and Security at Sir Syed University of Engineering and Technology, October 2023 to expected August 2027. Coursework includes cryptography, network security, operating systems, data structures, cloud computing, databases and web engineering.", u: "#stack" },
  { t: "Cloud and infrastructure", x: "Azure cloud deployment, Docker containers, Linux and WSL2 on Ubuntu. Secure infrastructure for AI services.", u: "#stack" },
  { t: "Full-stack engineering", x: "Python, TypeScript, JavaScript, FastAPI, Next.js, React, Node.js, Tailwind CSS, Supabase, SQLite and Stripe integration for web products.", u: "#stack" },
  { t: "Working with me", x: "Based in Karachi, Pakistan, with flexible hours. Open to freelance projects and roles. Contact by email, LinkedIn or GitHub.", u: "#contact" },
];

const STOP = new Set(
  "a an the and or of to in on for with is are was were be been it its this that these those i you my me we do does did how what which who when where why can could should would about into from by as at have has had not no your our".split(" "),
);
const stem = (w: string) =>
  w.length > 4 ? w.replace(/(ies)$/, "y").replace(/(ing|ed|es|s)$/, "") : w.replace(/s$/, "");
const tok = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((w) => w && !STOP.has(w)).map(stem);

const CONCEPTS: Record<string, string[]> = {
  voice: ["voice", "audio", "speech", "speak", "call", "phone", "vapi", "latency", "stream", "realtime", "live", "talk"],
  security: ["secur", "hack", "ceh", "owasp", "pentest", "penetration", "vapt", "vulnerab", "crypt", "attack", "defend", "defense", "harden", "abuse", "safe", "protect", "threat", "risk", "ethical", "audit", "network", "trust"],
  retrieval: ["rag", "retriev", "search", "document", "pdf", "chatbot", "knowledge", "embed", "vector", "faiss", "chroma", "rerank", "bm25", "chunk", "citation", "question", "answer", "assistant", "hybrid", "index"],
  automation: ["n8n", "workflow", "automat", "orchestrat", "agent", "agentic", "pipeline", "extract", "drive", "sheet", "spreadsheet", "invoice", "claude", "anthropic"],
  payments: ["saas", "stripe", "payment", "billing", "invoice", "fee", "product", "startup", "launch", "freelanc", "money", "revenue", "subscription", "checkout"],
  web3: ["blockchain", "algorand", "web3", "rwa", "token", "passport", "ownership", "asset", "decentral", "ledger", "crypto", "wallet", "founder"],
  cloud: ["azure", "docker", "linux", "cloud", "deploy", "container", "infrastructure", "server", "devops", "wsl2", "ubuntu", "host"],
  web: ["react", "next", "typescript", "javascript", "node", "tailwind", "fastapi", "frontend", "backend", "fullstack", "full", "web", "supabase", "python"],
  person: ["education", "university", "degree", "study", "student", "bs", "graduate", "certif", "credential", "fellowship", "ielts", "english", "language", "karachi", "pakistan", "hire", "contact", "email", "freelance", "available", "timezone", "experience", "background"],
};
const CN = Object.keys(CONCEPTS);
const PFX: [string, string][] = CN.flatMap((c) => CONCEPTS[c].map((w) => [w, c] as [string, string]));

function cvec(tokens: string[]): number[] {
  const v = CN.map(() => 0);
  tokens.forEach((t) => {
    const seen = new Set<string>();
    PFX.forEach(([p, c]) => {
      if (t.startsWith(p) && !seen.has(c)) { seen.add(c); v[CN.indexOf(c)] += 1; }
    });
  });
  return v;
}

const docTok = DOCS.map((d) => tok(`${d.t} ${d.t} ${d.x}`));
const docVec = docTok.map(cvec);
const N = DOCS.length;
const avgLen = docTok.reduce((s, t) => s + t.length, 0) / N;
const df: Record<string, number> = {};
docTok.forEach((ts) => new Set(ts).forEach((t) => { df[t] = (df[t] || 0) + 1; }));

function bm25(q: string[]): number[] {
  const k1 = 1.5, b = 0.75;
  return docTok.map((ts) => {
    const tf: Record<string, number> = {};
    ts.forEach((t) => { tf[t] = (tf[t] || 0) + 1; });
    let s = 0;
    q.forEach((t) => {
      if (!tf[t]) return;
      const idf = Math.log(1 + (N - df[t] + 0.5) / (df[t] + 0.5));
      s += (idf * (tf[t] * (k1 + 1))) / (tf[t] + k1 * (1 - b + (b * ts.length) / avgLen));
    });
    return s;
  });
}
function concept(q: string[]): number[] {
  const qv = cvec(q);
  const qn = Math.hypot(...qv);
  return docVec.map((dv) => {
    const dn = Math.hypot(...dv);
    if (!qn || !dn) return 0;
    return qv.reduce((s, x, i) => s + x * dv[i], 0) / (qn * dn);
  });
}
function ranks(scores: number[]): Record<number, number> {
  const order = scores.map((s, i) => [s, i] as [number, number]).filter((a) => a[0] > 0).sort((a, b) => b[0] - a[0]);
  const r: Record<number, number> = {};
  order.forEach((a, i) => { r[a[1]] = i + 1; });
  return r;
}

export function search(query: string): Hit[] {
  const q = tok(query);
  if (!q.length) return [];
  const rk = ranks(bm25(q)), rc = ranks(concept(q));
  const out: Hit[] = [];
  for (let i = 0; i < N; i++) {
    const s = (rk[i] ? 1 / (60 + rk[i]) : 0) + (rc[i] ? 1 / (60 + rc[i]) : 0);
    if (s > 0) out.push({ i, s, rk: rk[i], rc: rc[i] });
  }
  return out.sort((a, b) => b.s - a.s).slice(0, 4);
}

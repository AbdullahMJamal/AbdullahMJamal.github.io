export type Zone = "untrusted" | "model" | "checked";

export interface Project {
  name: string;
  role: string;
  what: string;
  stack: string;
  links: { label: string; href: string }[];
}

export interface Stage {
  id: string;
  name: string;
  zone: Zone;
  line: string;
  risk: string;
  rule: string;
  projects: Project[];
  facts?: string[];
}

const gh = (repo: string) => `https://github.com/AbdullahMJamal/${repo}`;

export const stages: Stage[] = [
  {
    id: "input",
    name: "Input",
    zone: "untrusted",
    line: "Anything can arrive here.",
    risk: "Callers, uploaded files and form fields are written by strangers. Whatever arrives is data to be checked, never instructions to be followed.",
    rule: "Validate and limit input before it reaches a model.",
    projects: [
      {
        name: "Gemini Multimodal Live RAG",
        role: "Lead AI engineer",
        what: "A voice and text assistant that answers from a document store with very low latency, using streaming two-way audio over the Gemini 2.0 Multimodal Live API.",
        stack: "Python, Vertex AI, Gemini 2.0 Live API",
        links: [{ label: "Source", href: gh("gemini-multimodal-live-rag") }],
      },
      {
        name: "Vapi voice scheduling agent",
        role: "AI backend developer",
        what: "An autonomous voice agent that books client appointments over the phone and records them in a database.",
        stack: "Vapi, Python, FastAPI, SQLite",
        links: [{ label: "Source", href: gh("Vapi-voice-agent") }],
      },
    ],
  },
  {
    id: "retrieve",
    name: "Retrieve",
    zone: "untrusted",
    line: "Context can carry hidden instructions.",
    risk: "Retrieved text can hide instructions or expose what it should not. Search quality and search safety turn out to be the same problem.",
    rule: "Rank with more than one signal, and show the source of every answer.",
    projects: [
      {
        name: "Retrieval engines",
        role: "AI systems developer",
        what: "Hybrid search merges BM25 with Chroma vectors and re-ranks with Cohere Rerank-v3. A ten-module FAISS framework covers semantic and agentic chunking, multi-query retrieval and reciprocal rank fusion. A multimodal pipeline partitions PDFs with Unstructured.io and summarises tables and images with GPT-4o. A document chatbot cites its sources.",
        stack: "FAISS, Chroma, BM25, Cohere Rerank-v3, Unstructured.io, LangChain, GPT-4o",
        links: [
          { label: "Hybrid search", href: gh("Hybrid_Search-Reranking") },
          { label: "FAISS framework", href: gh("FAISS-Flow-RAG") },
          { label: "Multimodal RAG", href: gh("Multi-Modal-RAG") },
          { label: "Document chatbot", href: gh("Enterprise-RAG-Chatbot") },
        ],
      },
    ],
  },
  {
    id: "reason",
    name: "Reason",
    zone: "model",
    line: "A likely answer, not a verified one.",
    risk: "A model produces the most plausible answer. Its own confidence is a guess too.",
    rule: "Use the model to read and draft. Keep it away from decisions it cannot justify.",
    projects: [],
    facts: [
      "Anthropic Claude Certified: agentic workflows and system architecture.",
      "Official n8n certification: workflow orchestration.",
      "Models I have built with: Gemini 2.0, GPT-4o and Claude.",
    ],
  },
  {
    id: "verify",
    name: "Verify",
    zone: "checked",
    line: "Recompute. Do not trust.",
    risk: "A confidence score is self-reported. A wrong total delivered in a calm tone still looks right.",
    rule: "Recompute with plain code, catch duplicates, and send doubtful results to a person.",
    projects: [
      {
        name: "Document Data Extractor",
        role: "Automation engineer",
        what: "An n8n workflow that turns a document dropped in Google Drive into a checked row in Google Sheets. Code recomputes the maths instead of trusting the model, catches duplicates, and sends low-confidence results to a review folder with an alert.",
        stack: "n8n, LlamaParse, OpenAI, Google Workspace APIs",
        links: [{ label: "Source", href: gh("n8n-automation-workflows") }],
      },
    ],
  },
  {
    id: "act",
    name: "Act",
    zone: "checked",
    line: "Some steps cannot be unsent.",
    risk: "Sending, paying and publishing cannot be taken back.",
    rule: "Keep a person on the irreversible step, and give every part the least access it needs.",
    projects: [
      {
        name: "Settled",
        role: "Full-stack SaaS developer",
        what: "A SaaS app for freelancers that automates late-fee collection. It connects to Stripe, applies the user's late-fee rules to overdue invoices, and uses custom AI communication logic to chase payment. I architected and launched it as a full-stack product.",
        stack: "Next.js, TypeScript, Supabase, Stripe API",
        links: [],
      },
      {
        name: "Ownify",
        role: "Founder and Web3 developer",
        what: "A digital passport for real-world assets such as luxury watches, with tamper-proof cryptographic verification of ownership. I built the proof of concept on Algorand during the Algorand Pakistan Fellowship.",
        stack: "TypeScript, Algorand SDK",
        links: [{ label: "Source", href: gh("Ownify") }],
      },
    ],
  },
];

export const stack: { k: string; v: string }[] = [
  { k: "AI systems", v: "Gemini 2.0 Live API, LangChain, hybrid search, Cohere Rerank-v3, FAISS, Chroma, Vapi, Unstructured.io, n8n" },
  { k: "Security and cloud", v: "Penetration testing (VAPT), OWASP Top 10, network security, cryptography, Azure, Docker, Linux and WSL2" },
  { k: "Full stack", v: "Python, TypeScript, JavaScript, FastAPI, Next.js, React, Node.js, Tailwind CSS, Supabase, SQLite, Stripe" },
  { k: "Web3", v: "Algorand SDK, real-world asset tokenisation" },
];

export const credentials: { k: string; v: string }[] = [
  { k: "Certified Ethical Hacker", v: "Practical security credentials" },
  { k: "Anthropic Claude Certified", v: "Agentic workflows and system architecture" },
  { k: "n8n certification", v: "Workflow orchestration" },
  { k: "Algorand Pakistan Fellowship", v: "12-week technical programme, graduate" },
  { k: "BS Computer Network and Security", v: "Sir Syed University of Engineering and Technology, October 2023 to expected August 2027" },
  { k: "IELTS", v: "CEFR level B2" },
];

export const links = {
  email: "abdullahm.jamal234@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdullahmjamal",
  github: "https://github.com/AbdullahMJamal",
  x: "https://x.com/Abdullah_AMJ_",
  /** Public copy of the resume, with the phone number removed. */
  resume: "/Abdullah-Jamal-Resume.pdf",
};

"use client";

import { useState } from "react";
import s from "./Faq.module.css";

const faqs = [
  ["What does the free scan cover?", "A static analysis of your public store build, web app or source code. It doesn’t log in, test runtime behaviour or attack your APIs. The report is emailed when it’s ready."],
  ["Do I need to install anything or ship a special build?", "No. Pick your app from the store, upload a build, or point at a web app or API. Scans run on the build you ship."],
  ["Does agentic testing replace a manual pentest?", "For application penetration testing, yes. AI agents log in, get past runtime protections and follow the app into its APIs and back end, and every confirmed finding comes with a working exploit."],
  ["How do the agents get past login and MFA?", "You set up test access once: a dedicated test number or a TOTP seed. The agents use it to handle one-time codes and MFA."],
  ["Can I use my own AI model account?", "Yes. Bring your own key and the agents run on your model provider account, with a spend limit per scan."],
  ["What happens when AI credits run out?", "Continuous scanning keeps running. Agentic testing uses AI credits or an Agentic Pentest package, only where you choose."],
  ["How is it priced?", "Routine scanning is priced per app or repository. Agentic testing runs on credits or a package, so you pay for depth where you use it."],
  ["Is Ostorlab compliant and can it run on-premises?", "Ostorlab has a SOC 2 Type II report, supports SAML SSO, and offers an on-premises scanner."],
];

export default function Faq() {
  const [open, setOpen] = useState<boolean[]>(() => faqs.map((_, i) => i === 0));
  const toggle = (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)));

  const item = (i: number) => {
    const [q, a] = faqs[i];
    return (
      <div key={q} className={`${s.item} ${open[i] ? s.on : ""}`}>
        <button type="button" aria-expanded={open[i]} aria-controls={`faq-${i}`} onClick={() => toggle(i)}>
          <span className={s.n} aria-hidden="true">{i + 1}</span>
          {q}
          <span className={s.toggle} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 1v12M1 7h12" />
            </svg>
          </span>
        </button>
        <div id={`faq-${i}`} className={s.answer}>
          <div className={s.answerClip}>
            <p>{a}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={s.section}>
      <h2 className={`h2 h2-sky reveal ${s.rel}`}><span>Questions,</span><br />answered.</h2>

      <div className={s.grid}>
        <div className={`${s.col} reveal`}>{[0, 1, 2, 3].map(item)}</div>
        <div className={`${s.col} reveal`}>{[4, 5, 6, 7].map(item)}</div>
      </div>

      <p className={s.still}>Still not sure? <a href="#">Book a 20-minute call</a></p>
    </section>
  );
}

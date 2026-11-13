"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import s from "./FreeScan.module.css";

const customers = [
  { src: "nubank", alt: "Nubank", w: 250, h: 105, height: 35 },
  { src: "pnc", alt: "PNC", w: 398, h: 119, height: 32 },
  { src: "bread", alt: "Bread Financial", w: 307, h: 86, height: 31 },
  { src: "google", alt: "Google", w: 270, h: 89, height: 35 },
  { src: "tiktok", alt: "TikTok", w: 342, h: 100, height: 32 },
  { src: "rolex", alt: "Rolex", w: 155, h: 90, height: 45 },
];

const kinds = [
  {
    label: "Mobile app",
    placeholder: "Paste a Play Store, App Store or AppGallery link…",
    aria: "Store link",
    how: ["Static analysis of the public store build", "No login, runtime or back-end API testing", "Report emailed when ready"],
  },
  {
    label: "Web & API",
    placeholder: "https://app.yourcompany.com — only sites you own",
    aria: "Website address",
    how: ["Passive crawl, TLS, security headers, known-vulnerable components", "No login, form submission or attack payloads", "Report emailed when ready"],
  },
  {
    label: "Source code",
    placeholder: "github.com/your-org/your-repo, or drop a .zip",
    aria: "Repository",
    how: ["Code, dependencies and hardcoded secrets", "No build, runtime or exploit testing", "Report emailed when ready"],
  },
];

export default function FreeScan() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = kinds[active];

  function onKey(e: KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + kinds.length) % kinds.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="scan" className={s.section}>
      <Image className={s.scatter} src="/assets/art/scatter.png" alt="" width={1600} height={460} sizes="100vw" />

      <div className={s.trusted}>
        <span>Trusted by banks, fintechs and security teams at</span>
        <ul className={s.logos}>
          {customers.map((c) => (
            <li key={c.src}>
              <Image src={`/assets/customers/${c.src}.png`} alt={c.alt} width={c.w} height={c.h} style={{ height: c.height }} />
            </li>
          ))}
        </ul>
      </div>

      <h2 className={`h2 ${s.title}`}>Scan your app for free.</h2>
      <p className={s.sub}>Pick what to scan, paste the link, and get the report by email.</p>

      {/* ponytail: no scan backend yet, submit is a no-op until the API is wired */}
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="scan-target" className={s.srOnly}>{cur.aria}</label>
        <input id="scan-target" className={s.input} type="text" placeholder={cur.placeholder} />
        <div className={s.bar}>
          <div className={s.tabs} role="tablist" aria-label="What to scan" onKeyDown={onKey}>
            {kinds.map((k, i) => (
              <button
                key={k.label}
                ref={(el) => { tabs.current[i] = el; }}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="scan-target"
                tabIndex={i === active ? 0 : -1}
                className={s.tab}
                onClick={() => setActive(i)}
              >
                {k.label}
              </button>
            ))}
          </div>
          <span className={s.mail}>
            <span className={s.mailIcon} aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v.3l-9 5.6-9-5.6v-.3Z" />
                <path d="M3 9.2V17.5A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5V9.2l-8.5 5.3a1 1 0 0 1-1 0L3 9.2Z" />
              </svg>
            </span>
            Free report
          </span>
          <button type="submit" className={s.submit}>Scan free</button>
        </div>
      </form>

      <ul className={s.how}>
        {cur.how.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <p className={s.deep}>
        Need logged-in flows, runtime behavior and your APIs? <a href="#">Agentic Deep Scan</a>
      </p>
    </section>
  );
}

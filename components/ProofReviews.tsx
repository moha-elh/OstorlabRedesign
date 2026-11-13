"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import Arrow from "./Arrow";
import { useAutoAdvance } from "./useAutoAdvance";
import s from "./ProofReviews.module.css";

/* Picture panels are placeholders until the new case-study images land; keep the <img> slot. */
const cases = [
  {
    company: "Qatar Media Corporation",
    number: "4 months → 1 week",
    title: "From a four-month fix cycle to one week",
    text: "QMC added agentic security testing to its apps and cut the time from finding to fix from four months to one week.",
    img: { src: "/assets/product/screen-remediation.webp", w: 1600, h: 752 },
  },
  {
    company: "Bumble Inc.",
    number: "159 / 160",
    title: "99% of releases scanned before launch",
    text: "Bumble scans its iOS and Android store releases with Ostorlab before they go live: 159 of 160.",
    img: { src: "/assets/product/screen-release-monitor.webp", w: 870, h: 808 },
  },
  {
    company: "RSA Security",
    number: "Every release",
    title: "Part of the formal security sign-off",
    text: "RSA runs Ostorlab static and dynamic testing on every iOS and Android release before it ships.",
    img: { src: "/assets/product/screen-evidence.webp", w: 1600, h: 751 },
  },
];

/* Shortened from Gartner Peer Insights. Only the verbatim one carries quote marks. */
const reviews = [
  { quote: "Very efficient team and knowledgeable support engineers. The product keeps evolving and they take customer input seriously.", initials: "SA", role: "Senior AppSec Engineer", industry: "Banking" },
  { quote: "“The UI is easy to use. It took us a small amount of work to integrate the platform with our CI/CD.”", initials: "OA", role: "Operations Associate", industry: "IT Services" },
  { quote: "It made evaluating our internal mobile apps easy. Onboarding was smooth and the UI automation is great.", initials: "OA", role: "Operations Associate", industry: "IT Services" },
  { quote: "Very professional and technical. Unlike other vendors, the team after the sale was excellent.", initials: "SA", role: "Security Architect", industry: "Media" },
];

function Reviews() {
  // The list is rendered twice so the -50% drift loops seamlessly; the copy is hidden from assistive tech.
  return (
    <>
      <div className={s.revHead}>
        <h3>What security teams say</h3>
        <span><span className={s.stars} aria-hidden="true">★★★★★</span><strong>4.8/5</strong> on Gartner Peer Insights</span>
      </div>
      <div className={s.revRow}>
        <div className={s.marquee}>
          {[0, 1].map((copy) =>
            reviews.map((r) => (
              <figure key={`${copy}-${r.quote}`} className={s.review} aria-hidden={copy === 1}>
                <span className={s.stars} aria-hidden="true">★★★★★</span>
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <span className={s.avatar} aria-hidden="true">{r.initials}</span>
                  <span className={s.who}>
                    <strong>{r.role}</strong>
                    <span>{r.industry} · Gartner Peer Insights</span>
                  </span>
                </figcaption>
              </figure>
            ))
          )}
        </div>
      </div>
      <p className={s.fine}>
        Reviews from Gartner Peer Insights, shortened. Gartner Peer Insights content reflects the opinions of individual end users and does not represent the views of Gartner or its affiliates.
      </p>
    </>
  );
}

export default function ProofReviews() {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useAutoAdvance(cases.length, hover || focus);
  const go = (d: number) => setActive((active + d + cases.length) % cases.length);

  return (
    <section className={s.section}>
      <Image className={s.horizon} src="/assets/art/horizon.png" alt="" width={1600} height={640} sizes="120vw" />
      <div className={s.fade} aria-hidden="true" />

      <h2 className={`h2 ${s.rel}`}><span className={s.muted}>Proof from the teams</span><br />who use Ostorlab.</h2>

      <div
        className={s.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Case studies"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setFocus(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false); }}
      >
        <div className={s.track} style={{ "--i": active } as CSSProperties} aria-live={hover || focus ? "polite" : "off"}>
          {cases.map((c, i) => (
            <article
              key={c.company}
              className={`${s.card} ${i === active ? s.on : ""}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${cases.length}`}
              aria-hidden={i !== active}
              inert={i !== active}
            >
              <div className={s.pic}>
                <Image src={c.img.src} alt="" width={c.img.w} height={c.img.h} sizes="400px" />
                <div className={s.cap}>
                  <span>{c.company}</span>
                  <strong>{c.number}</strong>
                </div>
              </div>
              <div className={s.copy}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <a href="#">Read the case study <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
        <button type="button" className={`${s.nav} ${s.prev}`} aria-label="Previous case study" onClick={() => go(-1)}>‹</button>
        <button type="button" className={`${s.nav} ${s.next}`} aria-label="Next case study" onClick={() => go(1)}>›</button>
      </div>

      <div className={s.dots} aria-hidden="true">
        {cases.map((c, i) => <span key={c.company} className={i === active ? s.on : ""} />)}
      </div>

      <Reviews />
    </section>
  );
}

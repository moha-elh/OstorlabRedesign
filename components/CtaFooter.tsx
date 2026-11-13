import Image from "next/image";
import s from "./CtaFooter.module.css";

const columns = [
  ["Product", ["Mobile apps", "Web and APIs", "Source code", "Attack surface"]],
  ["Solutions", ["Banking and fintech", "Healthcare", "Gaming", "High tech"]],
  ["Resources", ["Blog", "Case studies", "Research", "Documentation"]],
  ["Company", ["Book a demo", "Partners", "Trust Center", "Contact"]],
] as const;

export default function CtaFooter() {
  return (
    <>
      <section className={s.cta}>
        <Image className={s.wave} src="/assets/art/wave.png" alt="" width={1600} height={560} sizes="100vw" />
        <h2 className={s.title}>See what it finds<br /><span className={s.muted}>in your app.</span></h2>
        <p className={s.lead}>Book a demo with the team, or start with a free scan of an app from the App Store or Google Play.</p>
        <div className={s.ctas}>
          <a className={`${s.btn} ${s.btnLight}`} href="#scan">Scan your app free</a>
          <a className={s.btn} href="#">Book a demo</a>
        </div>
      </section>

      <footer className={s.footer}>
        <div className={s.inner}>
          <div className={s.brand}>
            <Image src="/assets/brand/ostorlab-logo-white.png" alt="Ostorlab" width={3112} height={622} />
            <p>Continuous scanning and agentic pentesting for your mobile app and everything behind it.</p>
          </div>
          {columns.map(([title, links]) => (
            <nav key={title} className={s.col} aria-label={title}>
              <strong>{title}</strong>
              <ul>
                {links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </nav>
          ))}
          <div className={s.bottom}>
            <span>© 2026 Ostorlab · SOC 2 Type II · 4.8/5 on Gartner</span>
            <span className={s.legal}>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </span>
          </div>
        </div>
        <div className={s.wordmark} aria-hidden="true">
          <Image src="/assets/brand/ostorlab-logo-white.png" alt="" width={3112} height={622} sizes="100vw" />
        </div>
      </footer>
    </>
  );
}

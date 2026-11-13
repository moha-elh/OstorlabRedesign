import Image from "next/image";
import s from "./Hero.module.css";

const stats = [
  ["97.1%", "verified exploitation on CyberGym"],
  ["<5%", "false positives, every finding proven"],
  ["159/160", "Bumble releases scanned before launch"],
];

export default function Hero() {
  return (
    <section className={s.hero}>
      <Image className={s.horizon} src="/assets/art/horizon.png" alt="" width={1600} height={640} sizes="100vw" priority />

      <nav className={s.nav} aria-label="Main">
        <div className={s.navLeft}>
          <a href="#" aria-current="page">Home</a>
          <a href="#">Product</a>
          <a href="#">Solutions</a>
        </div>
        <a className={s.logo} href="#" aria-label="Ostorlab home">
          <Image src="/assets/brand/ostorlab-logo-white.png" alt="Ostorlab" width={110} height={22} priority />
        </a>
        <div className={s.navRight}>
          <a className={s.hideSm} href="#">Pricing</a>
          <a className={s.hideSm} href="#">Docs</a>
          <a className={s.demo} href="#">Book a demo</a>
        </div>
      </nav>

      <div className={s.body}>
        <a className={s.rating} href="#">
          <span aria-hidden="true">★★★★★</span>4.8/5 on Gartner Peer Insights
        </a>
        <h1 className={s.title}>
          Pentest your <span className={s.muted}>mobile app</span>{" "}
          <br />
          <span className={s.muted}>and</span> everything behind it.
        </h1>
        <p className={s.lead}>
          Continuous scanning on every release, and AI agents that log in, get past pinning and prove each finding with a working exploit.
        </p>
        <div className={s.ctas}>
          <a className={`${s.btn} ${s.btnLight}`} href="#scan">Scan your app free</a>
          <a className={s.btn} href="#">Book a demo</a>
        </div>
      </div>

      <ul className={s.stats}>
        {stats.map(([value, label]) => (
          <li key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

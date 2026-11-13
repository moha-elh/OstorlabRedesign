import Image from "next/image";
import s from "./Agentic.module.css";

/*
 * Each cell's art is one swappable SVG plus the pulsing orb on top.
 * To replace an illustration, swap the file and the orb position; layout doesn't change.
 */
const steps = [
  {
    art: { src: "gets-in", w: 400, orb: { x: 216.9, y: 102.5, size: 58 } },
    title: "Gets in",
    text: "Handles login, one-time codes and MFA with a dedicated test number or TOTP seed.",
    why: "Most of the risk sits behind the login screen.",
  },
  {
    art: { src: "gets-past", w: 600, orb: { x: 268.1, y: 161, size: 50 } },
    title: "Gets past",
    text: "Tests the store build, bypasses TLS pinning and obfuscation, checks app shielding on real devices.",
    why: "You test what your customers run.",
  },
  {
    art: { src: "goes-through", w: 600, orb: { x: 332.3, y: 104.5, size: 48 } },
    title: "Goes through",
    text: "Follows traffic into APIs, the web back end and code, hunting business-logic flaws like broken access between accounts.",
    why: "That’s where the money moves.",
  },
  {
    art: { src: "proves", w: 400, orb: { x: 165, y: 105, size: 70 } },
    title: "Proves",
    text: "One replayable exploit per attack chain, with requests, responses and steps to reproduce.",
    why: "Developers fix instead of arguing.",
  },
];

export default function Agentic() {
  return (
    <section className={s.section}>
      <h2 className="h2"><span className={s.muted}>How agentic testing works.</span><br />It starts where scanners stop.</h2>
      <p className={s.sub}>AI agents test your app the way an attacker would, on the apps and releases where depth matters.</p>

      <ol className={s.grid}>
        {steps.map(({ art, title, text, why }) => (
          <li key={title} className={s.cell}>
            <div className={s.vis} aria-hidden="true">
              <div className={s.stage} style={{ width: art.w }}>
                <Image src={`/assets/art/agentic/${art.src}.svg`} alt="" width={art.w} height={300} />
                <Image
                  className={s.orb}
                  src="/assets/art/orb.png"
                  alt=""
                  width={art.orb.size}
                  height={art.orb.size}
                  style={{ left: art.orb.x, top: art.orb.y }}
                />
              </div>
            </div>
            <div className={s.text}>
              <strong>{title}</strong>
              <span>{text}</span>
              <em>{why}</em>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

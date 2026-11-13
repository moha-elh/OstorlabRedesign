"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { useAutoAdvance } from "./useAutoAdvance";
import { useTabKeys } from "./useTabKeys";
import s from "./PlatformTour.module.css";

const views = [
  {
    tab: "Evidence",
    desc: "Intercepted traffic, file activity, function calls and decompiled code behind every finding, in one place.",
    img: { src: "/assets/product/screen-evidence.webp", alt: "Ostorlab evidence view", w: 1600, h: 751 },
  },
  {
    tab: "Remediation",
    desc: "Ranked by business impact, sent to your tickets with developer context, retested to confirm the fix.",
    img: { src: "/assets/product/screen-remediation.webp", alt: "Ostorlab remediation view", w: 1600, h: 752 },
  },
  {
    tab: "Autofix",
    desc: "A secure code change for each finding, with its reasoning, applied in one click.",
    img: { src: "/assets/product/screen-autofix.webp", alt: "Ostorlab autofix view", w: 823, h: 659 },
  },
  {
    tab: "Attack surface",
    desc: "Every app, domain and API carrying your name, found through app stores, registries and crawling.",
    img: { src: "/assets/product/screen-attack-surface.webp", alt: "Ostorlab attack surface view", w: 1600, h: 772 },
  },
];

export default function PlatformTour() {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useAutoAdvance(views.length, hover || focus);
  const keys = useTabKeys(views.length, active, setActive);

  return (
    <section
      className={s.section}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false); }}
    >
      <h2 className={`h2 reveal ${s.rel}`}><span className={s.muted}>One platform,</span><br />from finding to fix.</h2>

      <div className={`${s.segWrap} reveal`}>
        <div className={s.seg} role="tablist" aria-label="Platform views" onKeyDown={keys.onKeyDown}>
          {views.map((v, i) => (
            <button
              key={v.tab}
              ref={keys.ref(i)}
              type="button"
              role="tab"
              id={`tour-tab-${i}`}
              aria-selected={i === active}
              aria-controls="tour-panel"
              tabIndex={i === active ? 0 : -1}
              className={s.tab}
              onClick={() => setActive(i)}
            >
              {v.tab}
            </button>
          ))}
        </div>
      </div>

      <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${active}`}>
        <div className={`${s.stage} reveal`}>
          <div className={s.glow} aria-hidden="true" />
          <div className={s.track} style={{ "--i": active } as CSSProperties}>
            {views.map((v, i) => (
              <div key={v.tab} className={`${s.screen} ${i === active ? s.on : ""}`} aria-hidden={i !== active}>
                <Image src={v.img.src} alt={v.img.alt} width={v.img.w} height={v.img.h} sizes="920px" />
              </div>
            ))}
          </div>
        </div>
        <p className={s.desc}>{views[active].desc}</p>
      </div>
    </section>
  );
}

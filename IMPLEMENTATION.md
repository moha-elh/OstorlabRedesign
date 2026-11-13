# Ostorlab landing page — implementation guide

This repo turns the **confirmed design** of the new ostorlab.co landing page into a real, production page.
Everything you need is in `design/`. This file explains how to build it section by section so that every detail matches, and how to commit the work.

---

## 0. What's in `design/`

| Path | What it is | How to use it |
|---|---|---|
| `design/reference/index.html` | The confirmed design as one working HTML page (1440px wide). Tabs, carousels, FAQ and marquees all work. | **Source of truth** for copy, colours, spacing, type and behaviour. Open it in Chrome, inspect any element, copy exact values. |
| `design/reference/assets/` | Every image the page uses, renamed by purpose (`art/`, `brand/`, `customers/`, `integrations/`, `product/`). | Copy into the app's public/static folder. Keep the names. |
| `design/screenshots/full-page.png` | The whole page at 1440px. | Visual check. |
| `design/screenshots/sections/01-…09-*.png` | One screenshot per section, cropped exactly at section edges. | Overlay check for each section (see §4). |

The small script at the bottom of `reference/index.html` (`DCLogic`, `boot`) only exists to make the reference interactive. **Do not copy it into the product.** Rebuild the behaviour with the framework's own state (each section below lists the exact behaviour).

---

## 1. Ground rules

1. **Match the reference first, improve second.** Build each section to match the screenshot at 1440px before touching anything else. Improvements go in their own commits, after the match.
2. **No invented content.** Copy, numbers, logos and quotes come from the reference (which comes from ostorlab.co). If something looks wrong, flag it — don't rewrite it silently.
3. **No "AI look".** No fake UI data, green ticks, floating chips, or glow added "for polish". If it's not in the reference, it's not in the page.
4. **One section = one component.** `Hero`, `FreeScan`, `TwoWays`, `Agentic`, `ProofReviews`, `PlatformTour`, `Integrations`, `Faq`, `CtaFooter`.
5. **Tokens, not hex.** Every colour, radius and font size goes through the tokens in §2. A raw hex inside a component is a review comment.
6. **Stack:** your choice (Astro, Next.js, plain HTML/CSS — all fine). Use CSS custom properties for tokens whatever the stack. Decide it in the first commit and write it at the top of the README.

---

## 2. Design tokens

### Colours

| Token | Value | Used for |
|---|---|---|
| `--navy` | `#03203D` | Main dark background, dark text on light |
| `--blue` | `#0081BA` | Ostorlab blue: links on light, active states, progress |
| `--cyan` | `#67C9EE` | Links/accents on dark, progress bars on dark, focus ring |
| `--paper` | `#F4F6F8` | Light sections background |
| `--ink-hero` | `#0A0C10` | Hero background only (near-black) |
| `--white` | `#FFFFFF` | |
| `--text-dark-2` | `#B8CADB` | Body text on navy |
| `--text-dark-3` | `#7F98B3` | Muted text / first line of headings on navy |
| `--text-hero-2` | `#A9B4C0` | Body text in the hero |
| `--text-hero-3` | `#7D8A97` | Muted heading words in the hero |
| `--text-light-2` | `#4D6578` | Body text on paper |
| `--text-light-3` | `#7D8A97` | Labels on paper |
| `--head-light-muted` | `#9FB0C0` | First line of headings on paper |
| `--line-light` | `#E6EBF0` / `#E3E9EF` / `#EDF1F5` / `#DCE3EA` | Borders and dividers on paper (pick from reference per element) |
| `--line-dark` | `rgba(255,255,255,.12)` (also `.10`, `.14`, `.16`) | Borders and dividers on navy |
| `--star` | `#FBBF24` | Rating stars only |

### Type — Plus Jakarta Sans (400, 500, 600, 700)

| Role | Size / line height | Weight | Letter spacing |
|---|---|---|---|
| Hero H1 | 64 / 68 | 600 | -0.04em |
| CTA display | 80 / 84 | 600 | -0.05em |
| Section H2 | 52 / 58 | 600 | -0.04em |
| Card title (H3) | 26 / 32 | 600 | -0.03em |
| Small title | 22–24 / 30 | 600 | -0.02 to -0.03em |
| Big number (proof) | 42 / 46 | 600 | -0.04em |
| Stat (hero) | 32 / 36 | 600 | -0.03em |
| Quote | 19 / 29 | 400 | -0.01em |
| Body | 16 / 26 (15 / 24 in cards) | 400 | 0 |
| Label / small | 13–14 | 400–600 | 0 |
| Fine print | 12 / 18 | 400 | 0 |

**Two-tone headings:** every H2 has two lines. The first line is muted (`--text-dark-3` on navy, `--head-light-muted` on paper), the second is full colour. The hero does the same with single words ("mobile app", "and"). Keep the `<br>` break exactly where the reference has it.

Mobile (≤900px): H2 → 34/40, hero H1 → 38/44.

### Radii, shadows, motion

- Radii: 28 (proof cards), 24 (review cards, two-ways cards), 20 (tour screens), 18 (FAQ items, logo tiles), 16 (icon tiles), 10 (buttons), 999 (pills, dots, round buttons).
- Glass on navy: `background: rgba(255,255,255,.05–.06)`, `inset 0 0 0 1px rgba(255,255,255,.12–.16)`, `backdrop-filter: blur(14–16px)`.
- Motion: 200–250ms ease-out for hover/toggle, 500–600ms for carousel moves (`cubic-bezier(.2,.7,.2,1)` on proof), 6s for auto-advance. Respect `prefers-reduced-motion`: stop marquees, auto-advance and pulses.
- Focus: `outline: 2px solid var(--cyan); outline-offset: 2px` on links and buttons.

### Section joins (important — this is what makes the page feel like one piece)

Sections don't have hard edges; colour hands over through gradients. Copy these exactly:

| Join | How |
|---|---|
| Hero → Free scan | Free-scan background starts at `#0A0C10` and runs through navy → blue → sky to paper (`linear-gradient(180deg, #0A0C10 0%, #0A0C10 24%, #0A1426 34%, #0B2550 44%, …)` plus a radial glow `radial-gradient(55% 22% at 50% 63%, rgba(90,175,255,.55), transparent 70%)`). Copy the full value from the reference. |
| Two ways → Agentic | `linear-gradient(180deg, #F4F6F8 0%, #CFDCE8 8%, #4E6F92 18%, #0B2D4C 28%, #03203D 38%, #03203D 100%)`, top padding 200px. |
| Tour → Integrations | `linear-gradient(180deg, #03203D 0px, #0B2D4C 60px, #5E7C9A 150px, #C9D6E2 230px, #F4F6F8 300px)`, top padding 300px. |
| Integrations → FAQ | The same in reverse: `#F4F6F8 0 → #C9D6E2 70px → #5E7C9A 150px → #0B2D4C 230px → #03203D 300px`, top padding 300px. |

The page is full-bleed: colours run edge to edge, no grey frame, no rounded section corners.

---

## 3. Sections

Positions are at 1440px wide (`top` / height). Screenshot: `design/screenshots/sections/<file>`.

### 01 · Hero — `01-hero.png` (0 / 880)
- Background `#0A0C10`, min-height 880, flex column.
- **Nav:** 3-column grid (`1fr auto 1fr`), padding `26px 40px 0`. Left: Home (white), Product, Solutions (`#A9B4C0`, 14px). Centre: white Ostorlab logo (`brand/ostorlab-logo-white.png`, 22px high). Right: Pricing, Docs, "Book a demo" (600, outlined pill).
- Rating line (★★★★★ 13px in `--star` + "4.8/5 on Gartner Peer Insights"), then the H1 "Pentest your **mobile app** / **and** everything behind it." (muted words in `#7D8A97`), paragraph (16/25, `#A9B4C0`), two buttons: "Scan your app free" (white bg, dark text) and "Book a demo" (outline).
- `art/horizon.png` (dotted globe horizon) under the text, full width, opacity .75.
- Three stats over the horizon divided by 1px `rgba(255,255,255,.14)` lines: 97.1% / <5% / 159/160 with 13px captions.
- Entry animation: content rises in (`rise`: 40px → 0, opacity 0 → 1, 1.6s ease-out). Off for reduced motion.

### 02 · Free scan — `02-free-scan.png` (880 / 932)
- Padding `150px 24px 130px`, the hero → sky gradient (see §2 joins). `art/scatter.png` continues the globe dots at the top.
- "Trusted by banks, fintechs and security teams at" (14px, `#C9D3DC`) + 6 customer logos (`customers/*.png`, white, opacity .92): Nubank, PNC, Bread, Google, TikTok, Rolex.
- H2 "Scan your app for free." (white, single tone) + subtitle (17/27, white 88%).
- **Scan form (one glass panel):** three tabs — Mobile app / Web & API / Source code. The selected tab is filled navy with white text; the others are navy text.
  Switching a tab changes, with no page jump:
  | Tab | Placeholder | aria-label | "How" list |
  |---|---|---|---|
  | Mobile app | `Paste a Play Store, App Store or AppGallery link…` | Store link | Static analysis of the public store build · No login, runtime or back-end API testing · Report emailed when ready |
  | Web & API | `https://app.yourcompany.com — only sites you own` | Website address | Passive crawl, TLS, security headers, known-vulnerable components · No login, form submission or attack payloads · Report emailed when ready |
  | Source code | `github.com/your-org/your-repo, or drop a .zip` | Repository | Code, dependencies and hardcoded secrets · No build, runtime or exploit testing · Report emailed when ready |
- "Scan free" button (14px/700, blue). Below: "Need logged-in flows, runtime behaviour and your APIs? **Agentic Deep Scan**" (link in `--blue`).
- Tabs are a real `role="tablist"` with arrow-key support; the input has a visible label or the aria-label above.

### 03 · Two ways to test — `03-two-ways.png` (1812 / 1016)
- Background `--paper`, padding `40px 64px`.
- H2 "Two ways to test. / One platform." + subtitle.
- **Two cards side by side** (`.wcard`: white, 1px `#E3E9EF`, radius 24, inner padding 10). Each card: picture panel on top, then eyebrow (13px/600 `#4D6578`), H3 26px, paragraph 15/24, then 4 **spec rows**.
  - Card 1 picture: three small floating build tiles (v16.07, v16.08, v16.09 — the last in blue). Card 2 picture: the glass Ostorlab logo (`brand/ostorlab-logo-glass.png`) on a black panel.
  - Spec row (`.spec`): grid `22px 92px 1fr`, gap 12, padding 14px 0, top border `#EDF1F5`. Icon (Phosphor duotone, 22px) · key (13px/600 `#7D8A97`: Runs / Reaches / You get / Pricing) · value (15/22 navy).
  - Icons are **Phosphor duotone** (`@phosphor-icons/core`, MIT). Copy the inline SVGs from the reference.
- Card footer links: "Compare plans →", "See how it works →".
- Mobile: cards stack; spec rows drop the key column.

### 04 · Agentic testing — `04-agentic.png` (2828 / 1453)
- Padding `200px 48px 100px`, paper → navy gradient (see §2).
- H2 "How agentic testing works. / It starts where scanners stop." + subtitle (16/26 `#B8CADB`).
- **2 × 2 grid** with hairline dividers `rgba(255,255,255,.1)`; the cells are deliberately uneven (top row 2 equal halves, bottom row offset). Each cell: one simple object + the blue orb (`art/orb.png`), then title (22px/600), text (15/24 `#B8CADB`), and a one-line "why" in `--cyan` (13px/600):
  1. **Gets in** — a lit keypad card (login / OTP). *Most of the risk sits behind the login screen.*
  2. **Gets past** — a wall with a doorway. *You test what your customers run.*
  3. **Goes through** — three rising blocks. *That's where the money moves.*
  4. **Proves** — a disc with a ring. *Developers fix instead of arguing.*
- The orb pulses gently (`scale 1 → 1.08`, 3.2s ease-in-out, infinite). Off for reduced motion.
- ⚠️ **Open:** these illustrations will be revisited. Build them as replaceable images/SVG components (one per cell), so swapping art doesn't touch layout.

### 05 · Proof + reviews — `05-proof-and-reviews.png` (4281 / 1287)
- Navy, padding `40px 48px 120px`. `art/horizon.png` behind the cards (left -10%, top 300px, width 120%, opacity .9) with a navy fade over its top 360px.
- H2 "Proof from the teams / who use Ostorlab."
- **Case-study carousel (glass cards):**
  - Cards `.gcard2`: 900px wide, radius 28, glass (`rgba(255,255,255,.06)`, 1px `rgba(255,255,255,.16)`, blur 16, shadow `0 30px 70px rgba(0,0,0,.35)`). Left: 400px picture panel with a navy gradient overlay and, at the bottom, company (14px/600 `#B8CADB`) + big number (42/46). Right: title (26/32), text (16/26), "Read the case study →" in cyan.
  - Order: Qatar Media Corporation (4 months → 1 week) · Bumble Inc. (159 / 160) · RSA Security (Every release).
  - Track: `transform: translateX(calc(50% - 450px - i * 924px))` (900 card + 24 gap), 600ms `cubic-bezier(.2,.7,.2,1)`. Inactive cards: opacity .35, scale .93; active: 1 / 1 (500ms ease-out).
  - Prev/next: 48px round buttons, 1px `rgba(255,255,255,.3)`, at `calc(50% - 496px)` from each side, 210px from the top of the track. Dots: 8px, active stretches to 28px white.
  - Auto-advance every 6s; **pause on hover and on keyboard focus**; stop for reduced motion.
  - ⚠️ **Open:** the three picture panels use product screenshots as placeholders. New images are coming — keep the panel as an `<img>` with `object-fit: cover` so they drop in.
- **Reviews (directly under the carousel, same section):**
  - Header row: top border `rgba(255,255,255,.12)`, margin-top 80, padding-top 40. Left "What security teams say" (24/30, 600). Right ★★★★★ **4.8/5** on Gartner Peer Insights.
  - A row of 4 review cards (`.rv`: 420px, radius 24, glass, padding 30) drifting left: duplicate the list once and animate `translateX(0 → -50%)` over **60s linear, infinite**. **Hovering the row pauses it.** Left and right edges fade out with a mask (`transparent → black 10% … 90% → transparent`).
  - Card: stars, quote (19/29), then a divider and the reviewer: 38px gradient avatar with initials (`#0081BA → #67C9EE`), role (14/600) and "Industry · Gartner Peer Insights" (13px `#7F98B3`).
  - Only the "The UI is easy to use…" review is in quote marks (it's verbatim); the others are shortened, so no quote marks.
  - **Required fine print** under the row (12/18 `#7F98B3`, centred, max 720px): "Reviews from Gartner Peer Insights, shortened. Gartner Peer Insights content reflects the opinions of individual end users and does not represent the views of Gartner or its affiliates." Don't remove it.

### 06 · Platform tour — `06-platform-tour.png` (5568 / 1026)
- Navy, padding `40px 48px 120px`.
- H2 "One platform, / from finding to fix."
- **Segmented control** (`.seg`: pill, 5px padding, glass): Evidence · Remediation · Autofix · Attack surface. Active pill is white with navy text and a 2px blue progress line inside that fills in 6s.
- Description under it changes per tab (16/26 `#B8CADB`, centred):
  1. Intercepted traffic, file activity, function calls and decompiled code behind every finding, in one place.
  2. Ranked by business impact, sent to your tickets with developer context, retested to confirm the fix.
  3. A secure code change for each finding, with its reasoning, applied in one click.
  4. Every app, domain and API carrying your name, found through app stores, registries and crawling.
- **Sliding screens:** `.scard` 920px wide, radius 20, white, shadow `0 40px 80px rgba(0,0,0,.45)`, image 16:9 `object-fit: cover; object-position: top left`. Track `translateX(calc(50% - 460px - i * 952px))`. Inactive: opacity .3, scale .9; transition 600ms ease-out. Screens: `product/screen-evidence`, `-remediation`, `-autofix`, `-attack-surface`.
- Auto-advance every 6s, synced with the progress line; clicking a tab jumps and restarts the progress. Pause on hover/focus.

### 07 · Integrations — `07-integrations.png` (6594 / 899)
- Navy → paper gradient (see §2), padding `300px 48px 110px`.
- H2 "Findings land where / your team already works." + "Run scans from CI/CD, push findings to Jira, Linear or ServiceNow, and get told in Slack."
- **Two rows of tiles** moving in opposite directions (`.mq2`: 46s linear infinite, second row `animation-direction: reverse`). Each row's list is duplicated for a seamless loop.
- Tile `.mt`: height 84, padding `0 30px`, radius 18, white, 1px `#E6EBF0`. Logo max 30px high / 140px wide.
  - Wordmark logos (Jira, GitHub, GitLab, Bitrise, CircleCI, ServiceNow, Jenkins, AWS) show alone.
  - Icon-only logos (Slack, Linear, Bitbucket, Google Cloud) get their name next to them (19px/600).
- Default state: logos grey (`filter: grayscale(1) contrast(.9); opacity: .5`), names `#9AA7B4`.
- **Hover a tile:** that row stops (`.mrow:hover .mq2 { animation-play-state: paused }`), the tile's logo turns its real colour (filter none, opacity 1), its name turns navy, border `#C9D6E2`, shadow `0 10px 24px rgba(3,32,61,.08)`. 200ms ease-out.

### 08 · FAQ — `08-faq.png` (7493 / 1053)
- Paper → navy gradient (see §2), padding `300px 48px 110px`.
- H2 "Questions, / answered."
- **Two columns** of 4 items each (Q1–4 left, Q5–8 right). Questions:
  1. What does the free scan cover? 2. Do I need to install anything or ship a special build? 3. Does agentic testing replace a manual pentest? 4. How do the agents get past login and MFA? 5. Can I use my own AI model account? 6. What happens when AI credits run out? 7. How is it priced? 8. Is Ostorlab compliant and can it run on-premises?
  Answers: copy from the reference.
- Item `.fqd`: radius 18, glass (`rgba(255,255,255,.05)`, inset 1px `.1`). Button row padding 20: number chip (26px, radius 8), question (16/600), round toggle on the right (34px, white with "+").
- **Open state:** background `.09`, inset border `rgba(103,201,238,.6)`, the toggle turns blue and rotates 45° (so "+" becomes "×"), answer shows (15/24 `#B8CADB`, padding `0 70px 22px 60px`). 250ms.
- Items open/close **independently** (several can be open). Q1 is open on load.
- Use `<button aria-expanded>` + `aria-controls`, or `<details>/<summary>` styled to match.
- Under the grid: "Still not sure? **Book a 20-minute call**" (link in cyan).

### 09 · CTA + footer — `09-cta-footer.png` (8546 / 1272)
- Navy, padding `40px 48px 48px`.
- Display heading "See what it finds / in your app." (80/84, second line muted `#7F98B3`) + paragraph + "Scan your app free" (white) and "Book a demo" (outline).
- `art/wave.png` (dotted wave) behind the CTA, full width.
- **Footer:** top border `rgba(255,255,255,.12)`. Left: logo + "Continuous scanning and agentic pentesting for your mobile app and everything behind it." Four columns — Product / Solutions / Resources / Company (titles 14/600 white, links 14px `#B8CADB`). Bottom bar 13px `#7F98B3`: "© 2026 Ostorlab · SOC 2 Type II · 4.8/5 on Gartner" and Terms · Privacy · LinkedIn · GitHub.
- **Cut wordmark:** the Ostorlab logo, huge (≈1344px wide), opacity .07, inside a box 170px high with `overflow: hidden` and `margin: 44px -48px -48px`, so the bottom of the wordmark is cut off by the page edge. It must touch the very bottom of the page.

---

## 4. Workflow for each section ("nail it" checklist)

Do these in order, one section at a time. Don't start the next section until the current one passes.

1. **Read** the section in `reference/index.html` (DevTools → select the `<section>` → copy styles) and its screenshot.
2. **Markup:** semantic HTML (`section`, `h2`, `ul`, `figure`/`blockquote` for quotes, `button` for anything clickable). Copy text **exactly** — punctuation, arrows (→), en dashes and curly quotes included.
3. **Styles:** tokens only. Check every value against the reference: padding, gaps, max-widths, font size/line height/weight/letter spacing, colours, borders, radii, shadows, opacity of images.
4. **Assets:** use the files from `design/reference/assets/`. Set `width`/`height` on images, `alt=""` on decorative art, real alt text on logos.
5. **Behaviour:** implement the interactions listed in §3 with exact timings. Then add: keyboard support, focus states, pause on hover/focus, reduced motion.
6. **Overlay check at 1440px:** take a screenshot of your section at 1440 wide and compare it to `design/screenshots/sections/NN-*.png` (put one over the other at 50% opacity, or run a pixel diff — e.g. Playwright + `pixelmatch`). Text baselines, edges and image positions should line up. Animated parts: compare a paused frame.
7. **Joins:** check the section together with its neighbours — no visible line or colour jump where gradients meet.
8. **Responsive:** check 1280, 1024, 768, 390. The design was only drawn at 1440; follow the mobile rules in §2/§3 (H2 34/40, stacked cards, 86vw carousel cards, picture panels on top). Anything unclear on mobile → note it in the PR instead of guessing big changes.
9. **Quality:** no console errors, Lighthouse accessibility ≥ 95, images lazy-loaded below the fold, no layout shift when tabs/FAQ change.
10. **Commit** (see §5).

---

## 5. Commits and history

### One feature or change = one commit
Each commit does **one** thing and leaves the page working. Never mix sections in one commit, and never mix "build" with "refactor" or "fix".

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): what changed`, imperative, lower case, no period, ≤ 72 characters. Types: `feat`, `fix`, `style`, `refactor`, `chore`, `docs`, `perf`, `a11y` (or `fix(a11y)`). Scope = section name.

A good sequence:

```
chore: set up project and tooling
docs: add design reference and implementation guide
feat(tokens): add colour, type, radius and motion tokens
feat(assets): add landing page images
feat(hero): add nav, headline, buttons and stats
feat(hero): add horizon art and entry animation
feat(free-scan): add customer logos and sky gradient
feat(free-scan): add scan form with mobile/web/source tabs
feat(two-ways): add scanning and agentic cards with spec rows
feat(agentic): add four-step grid with orb
feat(proof): add case-study carousel
feat(proof): add drifting Gartner reviews under case studies
feat(tour): add segmented tabs and sliding screens
feat(integrations): add two moving logo rows with hover colour
feat(faq): add two-column FAQ with independent toggles
feat(cta): add CTA, footer and cut wordmark
fix(a11y): pause carousels on focus and for reduced motion
style(responsive): stack two-ways cards below 900px
```

Rules:
- Stage only what belongs to the commit (`git add -p`).
- If you notice an unrelated problem, finish the current commit first, then fix it in its own commit.
- One pull request per section (or per small group of commits), titled like the main commit.

### Keep the history yours — no AI attribution
Commits and PRs in this repo must show **only the repo owner** as author. If you use Claude (or any AI tool) to help:

- **No trailers** like `Co-Authored-By: Claude …` or `Claude-Session: …` in commit messages.
- **No** "🤖 Generated with Claude Code" or similar lines in PR titles, descriptions or comments.
- The **commit author and committer** are the repo owner's own git identity (`git config user.name` / `user.email`) — never a bot or AI address.
- `.claude/settings.json` in this repo turns Claude Code's automatic attribution off, and `CLAUDE.md` repeats these rules so Claude follows them.
- Check before pushing:
  ```
  git log --format='%an <%ae> | %cn <%ce>%n%B' origin/main..HEAD
  ```
  Every author/committer should be you, and no message should mention Claude.

---

## 6. Open items (don't block on them)

| Item | Status | What to do now |
|---|---|---|
| Proof card pictures | New images coming | Use the placeholders; keep the `<img>` slot. |
| Agentic illustrations | Will be revisited | Build as swappable per-cell art components. |
| Links | All `href="#"` in the reference | Point to the real ostorlab.co pages (pricing, docs, case studies, demo booking, partners). |
| Mobile layouts | Not designed yet | Follow §4 step 8; list questions in the PR. |
| Customer and integration logos | From ostorlab.co | Confirm usage rights before launch. |

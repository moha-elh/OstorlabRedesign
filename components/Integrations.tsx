import Image from "next/image";
import Arrow from "./Arrow";
import s from "./Integrations.module.css";

type Tool = { name: string; file: string; w: number; icon?: boolean };

/* Wordmarks show alone; icon-only logos get their name next to them. All files are 96px high. */
const rows: Tool[][] = [
  [
    { name: "Jira", file: "jira", w: 280 },
    { name: "GitHub", file: "github", w: 346 },
    { name: "Slack", file: "slack", w: 378, icon: true },
    { name: "Linear", file: "linear", w: 96, icon: true },
    { name: "GitLab", file: "gitlab", w: 296 },
    { name: "Bitrise", file: "bitrise", w: 334 },
  ],
  [
    { name: "Jenkins", file: "jenkins", w: 328 },
    { name: "CircleCI", file: "circleci", w: 410 },
    { name: "ServiceNow", file: "servicenow", w: 564 },
    { name: "Bitbucket", file: "bitbucket", w: 96, icon: true },
    { name: "AWS", file: "aws", w: 96 },
    { name: "Google Cloud", file: "google-cloud", w: 96, icon: true },
  ],
];

export default function Integrations() {
  return (
    <section className={s.section}>
      <div className={s.head}>
        <h2 className="h2"><span className={s.muted}>Findings land where</span><br />your team already works.</h2>
        <p>Run scans from CI/CD, push findings to Jira, Linear or ServiceNow, and get told in Slack.</p>
      </div>

      <div className={s.rows}>
        {rows.map((row, r) => (
          <div key={r} className={s.row}>
            {/* Each list is rendered twice for a seamless loop; the copy is hidden from assistive tech. */}
            <ul className={`${s.marquee} ${r === 1 ? s.reverse : ""}`}>
              {[0, 1].map((copy) =>
                row.map((t) => (
                  <li key={`${copy}-${t.file}`} className={s.tile} aria-hidden={copy === 1}>
                    <Image
                      className={t.icon ? s.iconLogo : undefined}
                      src={`/assets/integrations/${t.file}.png`}
                      alt={t.icon ? "" : t.name}
                      width={t.w}
                      height={96}
                    />
                    {t.icon && <span>{t.name}</span>}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className={s.more}>
        <a href="#">View all integrations <Arrow /></a>
      </div>
    </section>
  );
}

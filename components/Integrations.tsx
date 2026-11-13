import Image from "next/image";
import Arrow from "./Arrow";
import s from "./Integrations.module.css";

/* Brand icons from the CC0 svg-logos set; ServiceNow's mark is cropped from its wordmark. Every tile is icon + name. */
const rows = [
  [
    { name: "Jira", file: "jira.svg" },
    { name: "GitHub", file: "github.svg" },
    { name: "Slack", file: "slack.svg" },
    { name: "Linear", file: "linear.svg" },
    { name: "GitLab", file: "gitlab.svg" },
    { name: "Bitrise", file: "bitrise.svg" },
  ],
  [
    { name: "Jenkins", file: "jenkins.svg" },
    { name: "CircleCI", file: "circleci.svg" },
    { name: "ServiceNow", file: "servicenow.png" },
    { name: "Bitbucket", file: "bitbucket.svg" },
    { name: "AWS", file: "aws.svg" },
    { name: "Google Cloud", file: "google-cloud.svg" },
  ],
];

/*
 * The track holds the list 4 times and slides by -50% (2 copies), so it always covers the row,
 * even on wide screens, and the loop lands exactly on the seam. Copies after the first are hidden from assistive tech.
 */
const COPIES = [0, 1, 2, 3];

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
            <ul className={`${s.marquee} ${r === 1 ? s.reverse : ""}`}>
              {COPIES.map((copy) =>
                row.map((t) => (
                  <li key={`${copy}-${t.file}`} className={s.tile} aria-hidden={copy > 0}>
                    <Image src={`/assets/integrations/${t.file}`} alt="" width={32} height={28} />
                    <span>{t.name}</span>
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

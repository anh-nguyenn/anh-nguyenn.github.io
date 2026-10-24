import awards from "@/data/awards";
import education from "@/data/education";
import volunteering from "@/data/volunteering";
import work from "@/data/work";

const WAFER_SIZE = 19;

type Category = "ml" | "ai" | "data" | "edu";

const siteSpecs: Record<
  string,
  { abbr: string; code: string; coord: string; short: string; category: Category; r: number; c: number; w: number; h: number }
> = {
  GlobalFoundries: { abbr: "Global", code: "01", coord: "R6C9", short: "GlobalFoundries", category: "ml", r: 6, c: 9, w: 3, h: 3 },
  SimplifyNext: { abbr: "Simplify", code: "02", coord: "R10C12", short: "SimplifyNext", category: "ai", r: 10, c: 12, w: 3, h: 2 },
  NIE: { abbr: "NIE", code: "03", coord: "R4C12", short: "NIE", category: "ai", r: 4, c: 12, w: 2, h: 2 },
  BearingPoint: { abbr: "Bearing", code: "04", coord: "R12C8", short: "BearingPoint", category: "ai", r: 12, c: 8, w: 3, h: 2 },
  Keppel: { abbr: "Keppel", code: "05", coord: "R9C4", short: "Keppel", category: "ai", r: 9, c: 4, w: 2, h: 2 },
  IRAS: { abbr: "IRAS", code: "06", coord: "R6C4", short: "IRAS", category: "data", r: 6, c: 4, w: 2, h: 2 },
};

const eduSpecs: Record<
  string,
  { abbr: string; code: string; coord: string; short: string; r: number; c: number; w: number; h: number }
> = {
  "ntu-info-eng-media": { abbr: "NTU", code: "07", coord: "R13C13", short: "NTU", r: 13, c: 13, w: 3, h: 3 },
  "ku-exchange": { abbr: "KU", code: "08", coord: "R4C5", short: "Korea", r: 4, c: 5, w: 2, h: 2 },
};

const workSummaries: Record<string, string> = {
  GlobalFoundries:
    "Building AI and data science systems for semiconductor manufacturing and operations.",
  SimplifyNext:
    "Delivered end-to-end automation and AI solutions for four major clients.",
  NIE: "Built ML pipelines and analytics tools that cut review effort by 70%.",
  BearingPoint:
    "Delivered GenAI and AML solutions for banking clients in Europe and Asia.",
  Keppel:
    "Built analytics dashboards across four countries, improving satisfaction by 20%.",
  IRAS:
    "Engineered national-scale tax data pipelines, making core queries 8x faster and raising processing efficiency by 15%.",
};

const educationSummaries: Record<string, string> = {
  "ntu-info-eng-media":
    "Highest Distinction and Dean's List. Thesis: unifying LLMs with knowledge graphs for reliable chatbot interaction.",
  "ku-exchange": "Data Analytics coursework, graded A+.",
};


const legend: { category: Category; label: string }[] = [
  { category: "ml", label: "Applied ML" },
  { category: "ai", label: "AI & automation" },
  { category: "data", label: "Data engineering" },
  { category: "edu", label: "Education" },
];

const waferCells = Array.from({ length: WAFER_SIZE * WAFER_SIZE }, (_, index) => index);

export default function Home() {
  return (
    <>
      <section className="hero container" aria-labelledby="intro-title">
        <div className="hero-wafer">
          <div className="wafer-meta" aria-hidden="true">
            <span>LOT JN-2026</span>
            <span>{WAFER_SIZE} × {WAFER_SIZE} / {WAFER_SIZE * WAFER_SIZE} DIES</span>
          </div>
          <div className="wafer-frame">
            <div className="wafer" role="group" aria-label="Wafer map of roles and qualifications">
              {waferCells.map((cell) => (
                <span className="die-cell" key={cell} aria-hidden="true" />
              ))}

              {work.map((job) => {
                const spec = siteSpecs[job.slug];
                return (
                  <a
                    className="site-die"
                    data-category={spec.category}
                    key={job.slug}
                    href={`#${job.slug}`}
                    style={{
                      gridRow: `${spec.r} / span ${spec.h}`,
                      gridColumn: `${spec.c} / span ${spec.w}`,
                    }}
                    aria-label={`Site ${spec.code}, ${job.company}, ${job.title}, ${job.start} to ${job.end}. Jump to the record.`}
                    title={`${spec.coord} · ${job.company}`}
                  >
                    <span className="site-code">{spec.code}</span>
                    <span className="site-name" data-abbr={spec.abbr}>{spec.short}</span>
                  </a>
                );
              })}

              {education.map((item) => {
                const spec = eduSpecs[item.slug];
                return (
                  <a
                    className="site-die"
                    data-category="edu"
                    key={item.slug}
                    href={`#${item.slug}`}
                    style={{
                      gridRow: `${spec.r} / span ${spec.h}`,
                      gridColumn: `${spec.c} / span ${spec.w}`,
                    }}
                    aria-label={`Site ${spec.code}, ${item.institution}, ${item.degree}. Jump to the record.`}
                    title={`${spec.coord} · ${item.institution}`}
                  >
                    <span className="site-code">{spec.code}</span>
                    <span className="site-name" data-abbr={spec.abbr}>{spec.short}</span>
                  </a>
                );
              })}

              <span className="wafer-notch" aria-hidden="true" />
              <span className="wafer-scan" aria-hidden="true" />
            </div>
          </div>

          <ul className="legend" aria-label="Die categories">
            {legend.map((item) => (
              <li key={item.category} data-category={item.category}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-record">
          <h1 id="intro-title">Jerry<br />Nguyen</h1>
          <p className="positioning">
            Data scientist at <strong>GlobalFoundries</strong>, building systems
            for semiconductor operations and measuring whether they work better
            after.
          </p>


          <div className="hero-actions">
            <a className="button" href="mailto:nguyentuananh.kmf@gmail.com">
              Email me
            </a>
            <a className="link" href="#record">
              View the record
            </a>
          </div>
        </div>
      </section>

      <section className="log container" id="record" aria-labelledby="record-title">
        <div className="log-head">
          <h2 id="record-title">Process record</h2>
          <p className="log-code">LOT 01 / {work.length} SITES</p>
        </div>

        <div className="record-list">
          {work.map((job) => {
            const spec = siteSpecs[job.slug];
            return (
              <article
                className="record"
                id={job.slug}
                key={job.slug}
                aria-labelledby={`${job.slug}-title`}
              >
                <div className="record-site" aria-hidden="true">
                  <span className="record-number">{spec.code}</span>
                  <span className="record-coord">{spec.coord}</span>
                  <span className="record-tick" data-category={spec.category} />
                </div>
                <div className="record-main">
                  <h3 id={`${job.slug}-title`}>{job.title}</h3>
                  <p className="record-org">{job.company}</p>
                  <p className="record-outcome">{workSummaries[job.slug]}</p>
                </div>
                <div className="record-meta">
                  <span>{job.start} — {job.end}</span>
                  <span>{job.locations?.join(" / ")}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="log container" id="qualifications" aria-labelledby="qualifications-title">
        <div className="log-head">
          <h2 id="qualifications-title">Qualification record</h2>
          <p className="log-code">LOT 02 / {education.length} SITES</p>
        </div>

        <div className="record-list">
          {education.map((item) => {
            const spec = eduSpecs[item.slug];
            return (
              <article
                className="record"
                id={item.slug}
                key={item.slug}
                aria-labelledby={`${item.slug}-title`}
              >
                <div className="record-site" aria-hidden="true">
                  <span className="record-number">{spec.code}</span>
                  <span className="record-coord">{spec.coord}</span>
                  <span className="record-tick" data-category="edu" />
                </div>
                <div className="record-main">
                  <h3 id={`${item.slug}-title`}>{item.degree}</h3>
                  <p className="record-org">{item.institution}</p>
                  <p className="record-outcome">{educationSummaries[item.slug]}</p>
                </div>
                <div className="record-meta">
                  <span>{item.start} — {item.end}</span>
                  <span>{item.location}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="log container" id="recognition" aria-labelledby="recognition-title">
        <div className="log-head">
          <h2 id="recognition-title">Inspection log</h2>
          <p className="log-code">LOT 03 / {awards.length} PASSES</p>
        </div>

        <div className="award-list">
          {awards.map((award) => (
            <article className="award" key={award.title}>
              <p className="award-date">{award.date}</p>
              <div>
                <h3>{award.title}</h3>
                <p className="record-org">{award.issuer}</p>
              </div>
              <p className="award-detail">{award.detail ?? "—"}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="log container" id="service" aria-labelledby="service-title">
        <div className="log-head">
          <h2 id="service-title">Service log</h2>
          <p className="log-code">LOT 04 / {volunteering.length} SITES</p>
        </div>

        <div className="record-list">
          {volunteering.map((role) => (
            <article className="record record--compact" key={role.slug} aria-labelledby={`${role.slug}-title`}>
              <div className="record-main">
                <h3 id={`${role.slug}-title`}>{role.role}</h3>
                <p className="record-org">{role.organization}</p>
                <p className="record-outcome">{role.description}</p>
              </div>
              <div className="record-meta">
                <span>{role.start} — {role.end}</span>
                <span>Singapore</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact-inner">
          <div>
            <h2 id="contact-title">Start a conversation.</h2>
            <p>
              Data science, applied AI, or operational work worth measuring.
            </p>
          </div>
          <div className="contact-actions">
            <a className="button" href="mailto:nguyentuananh.kmf@gmail.com">
              nguyentuananh.kmf@gmail.com
            </a>
            <div className="contact-links">
              <a className="link" href="https://www.linkedin.com/in/jerrynguyentuananh/" rel="noreferrer">
                LinkedIn
              </a>
              <a className="link" href="https://github.com/jerrynguyentuananh" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

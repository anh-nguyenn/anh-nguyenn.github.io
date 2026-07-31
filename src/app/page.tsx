import education from "@/data/education";
import work from "@/data/work";

const facts = [
  ["Current role", "Data Scientist"],
  ["Focus", "Applied ML & analytics"],
  ["Based in", "Singapore"],
];

const workSummaries: Record<string, string> = {
  GlobalFoundries:
    "Applying data science to semiconductor manufacturing and operations.",
  SimplifyNext:
    "Delivered end-to-end automation and AI solutions for four major clients.",
  NIE: "Built ML pipelines and analytics tools that cut review effort by 70%.",
  BearingPoint:
    "Developed GenAI and AML prototypes for banking clients in Europe and Asia.",
  Keppel:
    "Built analytics dashboards across four countries, improving satisfaction by 20%.",
  IRAS:
    "Engineered datasets exceeding one billion rows and improved system speed by 8x.",
};

const educationSummaries: Record<string, string> = {
  "ntu-info-eng-media":
    "Highest Distinction, Dean's List - Computing and Intelligent Systems. Thesis: Unifying Large Language Models with Knowledge for Reliable Chatbot Interaction.",
  "ku-exchange": "Data Analytics - A+.",
};

export default function Home() {
  return (
    <>
      <section className="portfolio-hero container" aria-labelledby="intro-title">
        <p className="eyebrow">Data Scientist at GlobalFoundries</p>
        <h1 id="intro-title">Turning complex data into practical decisions.</h1>
        <div className="hero-copy">
          <p>
            I&apos;m Jerry Nguyen, a Data Scientist at{" "}
            <strong>GlobalFoundries</strong>, focused on applied machine
            learning, analytics, and operational impact.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">
              View experience
            </a>
            <a className="text-link" href="mailto:nguyentuananh.kmf@gmail.com">
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <aside className="facts container" aria-label="Professional summary">
        {facts.map(([label, value]) => (
          <div className="fact" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </aside>

      <section className="portfolio-section container" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">01 / Experience</p>
          <h2 id="work-title">Work experience</h2>
        </div>
        <div className="experience-list">
          {work.map((job, index) => (
            <article className="experience-row" key={job.slug}>
              <span className="item-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{job.title}</h3>
                <p className="item-organization">{job.company}</p>
                <p className="item-description">{workSummaries[job.slug]}</p>
              </div>
              <div className="item-meta">
                <span>{job.start} - {job.end}</span>
                <span>{job.locations?.join(" / ")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section container" id="education" aria-labelledby="education-title">
        <div className="section-heading">
          <p className="eyebrow">02 / Education</p>
          <h2 id="education-title">Education</h2>
        </div>
        <div className="education-list">
          {education.map((item) => (
            <article className="education-row" key={item.slug}>
              <div>
                <p className="item-meta">{item.start} - {item.end}</p>
                <h3>{item.degree}</h3>
                <p className="item-organization">{item.institution}</p>
              </div>
              <div>
                <p>{educationSummaries[item.slug]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section container" id="contact" aria-labelledby="contact-title">
        <p className="eyebrow">03 / Contact</p>
        <h2 id="contact-title">Let&apos;s connect.</h2>
        <p>Data science, applied AI, or meaningful technical work.</p>
        <a className="button button--primary" href="mailto:nguyentuananh.kmf@gmail.com">
          Send me an email
        </a>
      </section>
    </>
  );
}

import Image from "next/image";
import education from "@/data/education";
import recentProjects from "@/data/recentProjects";
import work from "@/data/work";
import openSource from "@/data/openSource";
import StarCount from "@/components/StarCount";
import Words from "@/components/Words";

type Repository = (typeof openSource)[number] & { stars: { count: number; approximate: boolean } };
const pad = (n: number) => String(n + 1).padStart(2, "0");

function SectionHead({ index, label, title, note }: { index: number; label: string; title: string; note: string }) {
  return (
    <header className="sec-head">
      <p className="eyebrow" data-reveal="">{String(index).padStart(2, "0")} — {label}</p>
      <Words as="h2" text={title} className="display" />
      <p className="sec-note" data-reveal="">{note}</p>
    </header>
  );
}

export default function PortfolioPage({ repositories }: { repositories: Repository[] }) {
  return (
    <>
      <section className="sec sec-hero" id="top" data-section="" data-title="Intro" aria-labelledby="hero-title">
        <div className="sec-inner">
          <p className="eyebrow hero-eyebrow" data-reveal=""><span className="signal" aria-hidden="true" /> Data scientist · Singapore</p>
          <h1 id="hero-title" className="display hero-title reveal" data-reveal="">
            <span className="line"><span className="w"><span className="wi">Jerry</span></span></span>
            <span className="line"><span className="w"><span className="wi" style={{ transitionDelay: "90ms" }}>Nguyen<em>.</em></span></span></span>
          </h1>
          <div className="hero-foot">
            <p className="lead" data-reveal="">Building AI and data science systems for semiconductor manufacturing at GlobalFoundries.</p>
            <a className="cue" href="#experience" data-scroll="smooth" data-reveal="">Scroll <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="sec" id="experience" data-section="" data-title="Experience" aria-labelledby="experience-title">
        <div className="sec-inner">
          <SectionHead index={1} label="Experience" title="Experience" note="Across manufacturing, consulting, research, and public systems." />
          <ol className="rows rows-side">
            {work.map((job, i) => (
              <li className="row" key={job.slug} data-reveal="">
                <span className="row-index">{pad(i)}</span>
                <div className="row-main">
                  <h3>{job.title}</h3>
                  <p className="row-sub">{job.company}</p>
                  <p className="row-body">{job.description}</p>
                </div>
                <span className="row-date">{job.start} — {job.end}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" id="projects" data-section="" data-title="Projects" aria-labelledby="projects-title">
        <div className="sec-inner">
          <SectionHead index={2} label="Projects" title="Selected products" note="Built end to end, from interface to release." />
          <ol className="rows">
            {recentProjects.map((p, i) => (
              <li className="proj" key={p.url} data-reveal="" data-preview={p.image} data-cursor="Visit">
                <span className="row-index">{pad(i)} / Product</span>
                <h3 className="proj-title"><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}<span aria-hidden="true"> ↗</span></a></h3>
                <p className="row-body">{p.description}</p>
                <p className="proj-stack">{p.stack}</p>
                <Image className="proj-thumb" src={p.image} width={p.imageWidth} height={p.imageHeight} alt={p.imageAlt} sizes="(max-width: 768px) 90vw, 360px" unoptimized />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" id="open-source" data-section="" data-title="Open source" aria-labelledby="open-source-title">
        <div className="sec-inner">
          <SectionHead index={3} label="Open source" title="Open source" note="Contributions across the AI ecosystem." />
          <ol className="rows rows-side">
            {repositories.map((repo, i) => (
              <li className="row" key={repo.repoUrl} data-reveal="">
                <span className="row-index">{pad(i)}</span>
                <div className="row-main">
                  <h3><a href={repo.repoUrl} target="_blank" rel="noopener noreferrer">{repo.project} <span aria-hidden="true">↗</span></a></h3>
                  <p className="row-body">{repo.description}</p>
                  <ul className="tags">{repo.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <StarCount count={repo.stars.count} approximate={repo.stars.approximate} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec-left" id="education" data-section="" data-title="Education" aria-labelledby="education-title">
        <div className="sec-inner">
          <SectionHead index={4} label="Education" title="Education" note="The foundations behind the work." />
          <ol className="rows rows-side rows-right">
            {education.map((item, i) => (
              <li className="row" key={item.slug} data-reveal="">
                <span className="row-index">{pad(i)}</span>
                <div className="row-main">
                  <h3>{item.degree}</h3>
                  <p className="row-sub">{item.institution}</p>
                  <p className="row-body">{item.description}</p>
                  {item.slug === "ntu-info-eng-media" && <p className="row-body">Dean&apos;s List. Thesis on LLMs and knowledge graphs for reliable chatbot interactions.</p>}
                </div>
                <span className="row-date">{item.start} — {item.end}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec-contact" id="contact" data-section="" data-title="Contact" aria-labelledby="contact-title">
        <div className="sec-inner">
          <p className="eyebrow" data-reveal="">05 — Contact</p>
          <Words as="h2" text="Have something to work on together?" className="display contact-title" />
          <a className="contact-email" href="mailto:nguyentuananh.kmf@gmail.com" data-reveal="" data-cursor="Write">nguyentuananh.kmf@gmail.com <span aria-hidden="true">↗</span></a>
          <div className="contact-links" data-reveal="">
            <a href="https://www.linkedin.com/in/jerrynguyentuananh/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/anh-nguyenn" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
          <div className="visitor" data-reveal="">
            <div>
              <strong>Visitors by country</strong>
              <p>Live country counts, starting with this counter.</p>
              <a href="https://s01.flagcounter.com/more/a4a14c/" target="_blank" rel="noopener noreferrer">View all statistics ↗</a>
            </div>
            {/* The remote image records a visit and updates its country counts. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://s01.flagcounter.com/count2/a4a14c/bg_FFFFFF/txt_262239/border_DDD8DC/columns_3/maxflags_30/viewers_Visitors/labels_1/pageviews_1/flags_1/percent_0/" alt="Live visitor counts by country" width={300} height={170} loading="lazy" decoding="async" />
          </div>
          <footer className="site-foot">
            <p>© 2026 Jerry Nguyen</p>
            <a href="#top">Back to top ↑</a>
          </footer>
        </div>
      </section>
    </>
  );
}

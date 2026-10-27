import education from "@/data/education";
import openSource from "@/data/openSource";
import recentProjects from "@/data/recentProjects";
import work from "@/data/work";
import StarCount from "@/components/StarCount";
import Image from "next/image";

function WorkEntry({ job }: { job: (typeof work)[number] }) {
  return (
    <article className="entry" id={job.slug}>
      <div className="entry-main">
        <h3>{job.title}</h3>
        <p className="entry-organization">{job.company}</p>
        <p className="entry-description">{job.description}</p>
      </div>
      <p className="entry-date">{job.start} to {job.end}</p>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <section className="intro container" id="top" aria-labelledby="intro-title">
        <div className="intro-content">
          <h1 id="intro-title">Jerry Nguyen</h1>
          <p className="intro-copy">
            Data scientist in Singapore building AI for semiconductor manufacturing at GlobalFoundries.
          </p>
          <div className="intro-actions">
            <a className="primary-link" href="mailto:nguyentuananh.kmf@gmail.com">
              Get in touch
            </a>
            <a className="text-link" href="#experience">Explore my work</a>
          </div>
        </div>
        <figure className="intro-art">
          <Image
            src="/Cozy%20Pixel%20Panda%20Coding%20Haven.jpg"
            width="877"
            height="877"
            alt="Pixel art of a panda coding at a desk at night"
            priority
            unoptimized
          />
        </figure>
      </section>

      <div className="container content-grid primary-grid">
      <section className="section" id="experience" aria-labelledby="experience-title">
        <div className="section-heading">
          <h2 id="experience-title">Experience</h2>
        </div>
        <div className="entry-list">
          {work.slice(0, 3).map((job) => <WorkEntry job={job} key={job.slug} />)}
        </div>
        <details className="more-experience">
          <summary>View earlier experience ({work.length - 3})</summary>
          <div className="entry-list">
            {work.slice(3).map((job) => <WorkEntry job={job} key={job.slug} />)}
          </div>
        </details>
      </section>
      <section className="section" id="education" aria-labelledby="education-title">
        <div className="section-heading"><h2 id="education-title">Education</h2></div>
        <div className="entry-list">
          {education.map((item) => (
            <article className="entry" key={item.slug} id={item.slug}>
              <div className="entry-main">
                <h3>{item.degree}</h3>
                <p className="entry-organization">{item.institution}</p>
                <p className="entry-description">{item.description}</p>
                {item.slug === "ntu-info-eng-media" && (
                  <p className="entry-note">
                    Dean&apos;s List. Thesis on LLMs and knowledge graphs for reliable chatbot interactions.
                  </p>
                )}
              </div>
              <p className="entry-date">{item.start} to {item.end}</p>
            </article>
          ))}
        </div>
      </section>
      </div>

      <div className="container content-grid secondary-grid">
      <section className="section" id="open-source" aria-labelledby="open-source-title">
        <div className="section-heading">
          <h2 id="open-source-title">Open source contribution</h2>
        </div>
        <div className="open-source-list">
          {openSource.map((repository) => (
            <article className="open-source-entry" key={repository.repoUrl}>
              <div className="open-source-topline">
                <h3>
                  <a href={repository.repoUrl} target="_blank" rel="noopener noreferrer">
                    {repository.project}
                  </a>
                </h3>
                <StarCount repoUrl={repository.repoUrl} />
              </div>
              <p className="open-source-description">{repository.description}</p>
              <div className="open-source-meta">
                <span className="contributor-label">Contributor</span>
                <ul className="open-source-tags" aria-label={`Topics for ${repository.project}`}>
                  {repository.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <h2 id="projects-title">Recent projects</h2>
        </div>
        <div className="project-list">
          {recentProjects.map((project) => (
            <article className="project-entry" key={project.url}>
              <div>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-stack">{project.stack.split(" · ").join(", ")}</p>
              </div>
              <div className="project-meta">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit project
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact-inner">
          <h2 id="contact-title">Let&apos;s talk.</h2>
          <p>Have a question or something to work on together?</p>
          <a className="contact-email" href="mailto:nguyentuananh.kmf@gmail.com">
            nguyentuananh.kmf@gmail.com
          </a>
          <div className="contact-socials">
            <a href="https://www.linkedin.com/in/jerrynguyentuananh/">LinkedIn</a>
            <a href="https://github.com/anh-nguyenn">GitHub</a>
          </div>
        </div>
      </section>
    </>
  );
}

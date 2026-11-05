import education from "@/data/education";
import openSource from "@/data/openSource";
import recentProjects from "@/data/recentProjects";
import work from "@/data/work";
import StarCount from "@/components/StarCount";
import Image from "next/image";

function WorkEntry({ job }: { job: (typeof work)[number] }) {
  return (
    <article className="work-entry" id={job.slug}>
      <div className="work-entry-head">
        <h3>{job.title}</h3>
        <p className="work-date">{job.start} to {job.end}</p>
      </div>
      <p className="work-company">{job.company}</p>
      <p className="work-description">{job.description}</p>
    </article>
  );
}

async function getRepositoryStars(repository: (typeof openSource)[number]) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { count: repository.fallbackStars, approximate: true };

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repository.repoUrl.replace("https://github.com/", "")}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const data: { stargazers_count?: number } = await response.json();
    if (typeof data.stargazers_count !== "number") throw new Error("No star count");
    return { count: data.stargazers_count, approximate: false };
  } catch {
    return { count: repository.fallbackStars, approximate: true };
  }
}

export default async function Home() {
  const repositories = await Promise.all(
    openSource.map(async (repository) => ({
      ...repository,
      stars: await getRepositoryStars(repository),
    })),
  );

  return (
    <>
      <section className="intro" id="top" aria-labelledby="intro-title">
        <div className="container intro-inner">
          <div className="intro-rule" aria-hidden="true" />
          <h1 id="intro-title">Jerry<br />Nguyen<span className="intro-period">.</span></h1>
          <div className="intro-lower">
            <div className="intro-statement">
              <p>Data scientist in Singapore building AI for semiconductor manufacturing at GlobalFoundries.</p>
              <div className="intro-actions">
                <a className="primary-link" href="mailto:nguyentuananh.kmf@gmail.com">Get in touch</a>
                <a className="text-link" href="#experience">Explore my work</a>
              </div>
            </div>
            <div className="hero-sculpture" aria-hidden="true">
              <div className="hero-plane">
                <span className="hero-initials">JN</span>
                <span className="hero-axis hero-axis-horizontal" />
                <span className="hero-axis hero-axis-vertical" />
              </div>
            </div>
          </div>
          <div className="intro-bottom-rule" aria-hidden="true" />
        </div>
      </section>

      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="container experience-layout">
          <div className="experience-lead">
            <h2 id="experience-title">Experience</h2>
            <p>Across manufacturing, consulting, research, and public systems.</p>
          </div>
          <div className="experience-content">
            <div className="work-list">
              {work.slice(0, 3).map((job) => <WorkEntry job={job} key={job.slug} />)}
            </div>
            <details className="more-experience">
              <summary>View earlier experience ({work.length - 3})</summary>
              <div className="work-list">
                {work.slice(3).map((job) => <WorkEntry job={job} key={job.slug} />)}
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <div className="section-intro">
            <h2 id="projects-title">Recent projects</h2>
            <p>A macOS annotation app and a private space for pronunciation practice.</p>
          </div>
          <div className="project-list">
            {recentProjects.map((project) => (
              <article className="project-entry" key={project.url}>
                <figure className="project-image">
                  <Image
                    src={project.image}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    alt={project.imageAlt}
                    unoptimized
                  />
                </figure>
                <div className="project-main">
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-side">
                  <p className="project-stack">{project.stack.split(" · ").join(", ")}</p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">Visit project</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="open-source-section" id="open-source" aria-labelledby="open-source-title">
        <div className="container">
          <div className="section-intro open-source-intro">
            <h2 id="open-source-title">Open source contribution</h2>
            <p>Work across LLM training, quantization, evaluation, and observability.</p>
          </div>
          <div className="open-source-list">
            {repositories.map((repository) => (
              <article className="open-source-entry" key={repository.repoUrl}>
                <div className="open-source-name">
                  <h3><a href={repository.repoUrl} target="_blank" rel="noopener noreferrer">{repository.project}</a></h3>
                  <StarCount count={repository.stars.count} approximate={repository.stars.approximate} />
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
        </div>
      </section>

      <section className="education-section" id="education" aria-labelledby="education-title">
        <div className="container education-layout">
          <h2 id="education-title">Education</h2>
          <div className="education-list">
            {education.map((item) => (
              <article className="education-entry" key={item.slug} id={item.slug}>
                <p className="education-date">{item.start} to {item.end}</p>
                <div>
                  <h3>{item.degree}</h3>
                  <p className="education-organization">{item.institution}</p>
                  <p className="education-description">{item.description}</p>
                  {item.slug === "ntu-info-eng-media" && (
                    <p className="education-note">Dean&apos;s List. Thesis on LLMs and knowledge graphs for reliable chatbot interactions.</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact-inner">
          <div>
            <h2 id="contact-title">Let&apos;s talk.</h2>
            <p>Have a question or something to work on together?</p>
          </div>
          <a className="contact-email" href="mailto:nguyentuananh.kmf@gmail.com">nguyentuananh.kmf@gmail.com</a>
          <div className="contact-socials">
            <a href="https://www.linkedin.com/in/jerrynguyentuananh/">LinkedIn</a>
            <a href="https://github.com/anh-nguyenn">GitHub</a>
          </div>
        </div>
        <div className="container visitor-stats" aria-labelledby="visitor-stats-title">
          <div className="visitor-stats-intro">
            <h2 id="visitor-stats-title">Visitors by country</h2>
            <p>Live country counts, starting with this counter.</p>
            <a href="https://s01.flagcounter.com/more/a4a14c/" target="_blank" rel="noopener noreferrer">View all visitor statistics</a>
          </div>
          {/* The remote image records a visit and updates its country counts on each page load. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="visitor-stats-image"
            src="https://s01.flagcounter.com/count2/a4a14c/bg_FFFFFF/txt_262239/border_DDD8DC/columns_3/maxflags_30/viewers_Visitors/labels_1/pageviews_1/flags_1/percent_0/"
            alt="Live visitor counts by country, displayed with flags and numbers"
            decoding="async"
          />
        </div>
      </section>
    </>
  );
}

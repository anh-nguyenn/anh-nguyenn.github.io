import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import projects from "@/data/projects";
import StackIcon from "tech-stack-icons";
import { BsStack, BsCardImage } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import AnimatedArticle from "@/components/AnimatedArticle";
import { techStackMap } from "@/lib/constants";
import { pageParams } from "@/lib/types";
import BackToPageButton from "@/components/BackToPageButton";
import remark_gfm from "remark-gfm";
import ImageCarouselWrapper from "@/components/ImageCarouselWrapper";

/**
 * Generate static parameters for the blog post pages to be pre-rendered.
 */
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * ProjectPage component that renders a single project based on the slug.
 */
export default async function ProjectPage(props: { params: pageParams }) {
  const { slug } = await props.params;
  const post = projects.find((p) => p.slug === slug);
  if (!post) return notFound();

  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "projects",
    `${slug}.mdx`
  );
  const projectPhotoDir = path.join(process.cwd(), "public", "projects", slug);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const mdxSource = fs.readFileSync(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX<{
    title: string;
    techStack: string[];
    teamSize: string;
    role: string;
    duration: string;
    githubUrl?: string;
  }>({
    source: mdxSource,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remark_gfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  });

  return (
    <AnimatedArticle>
      <BackToPageButton pageUrl="/projects" />
      <h1 className="text-3xl font-extrabold mb-4">{frontmatter.title}</h1>

      {/* GitHub Link Section */}
      {frontmatter.githubUrl && (
        <div className="mb-4">
          <Link
            href={frontmatter.githubUrl}
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-800 dark:text-gray-100 hover:text-blue-600 transition"
          >
            <FaGithub className="mr-2 w-5 h-5" />
            <span className="underline underline-offset-4">View on GitHub</span>
          </Link>
        </div>
      )}
      {/* Tech Stack Section */}
      <div className="w-full mb-8">
        <div
          className="flex items-center gap-2 mb-4"
          style={{ fontSize: "1.25rem" }}
        >
          <BsStack></BsStack>
          <h2 className="text-xl font-semibold">Tech Stack</h2>
        </div>
        <ul className="flex flex-wrap gap-4">
          {frontmatter.techStack?.map((tech) => (
            <li key={tech} className="flex items-center gap-2">
              <StackIcon
                name={techStackMap[tech] || tech}
                style={{ width: "24px", height: "24px" }}
              />
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Carousel - Display project photos if available */}
      {fs.existsSync(projectPhotoDir) &&
        fs.readdirSync(projectPhotoDir).length > 0 && (
          <div className="w-full">
            <div
              className="flex items-center gap-2 mb-4"
              style={{ fontSize: "1.25rem" }}
            >
              <BsCardImage></BsCardImage>
              <h2 className="text-xl font-semibold">Project Gallery</h2>
            </div>
            <ImageCarouselWrapper
              imageDir={`projects/${slug}`}
              altPrefix={frontmatter.title}
            />
          </div>
        )}

      {/* Display the actual content of the .mdx file */}
      <div className="max-w-4xl prose dark:prose-invert">{content}</div>
    </AnimatedArticle>
  );
}

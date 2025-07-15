"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import blog from "@/data/blog";
import projects from "@/data/projects";
import work from "@/data/work";
import education from "@/data/education";

/**
 * The "breadcrumbs" component that displays the current path as a series of links.
 */
export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // Only show breadcrumbs for /projects, /work, /education and their subpaths
  const allowedRoots = ["projects", "work", "education"];
  const isAllowed = segments.length > 0 && allowedRoots.includes(segments[0]);

  // Validate subpath: only show breadcrumbs if the root path exists
  let showBreadcrumbs = false;
  if (isAllowed) {
    if (segments.length === 1) {
      // Only /projects, /work, /education
      showBreadcrumbs = true;
    } else if (segments.length === 2) {
      // Dynamically get valid slugs from imported data
      const validSlugs: Record<string, string[]> = {
        // blog: blog.map((item) => item.slug),
        projects: projects.map((item) => item.slug),
        work: work.map((item) => item.slug),
        education: education.map((item) => item.slug),
      };
      showBreadcrumbs = validSlugs[segments[0]]?.includes(segments[1]) ?? false;
    }
  }

  return (
    <div className="flex items-center gap-1 text-lg text-black dark:text-white my-auto">
      <Link href="/" className="hover:text-blue-400 font-semibold">
        {/* Initials on mobile */}
        <span className="block md:hidden">Jerry</span>
        {/* Full name on desktop */}
        <span className="hidden md:inline">Jerry Nguyen Tuan Anh</span>
      </Link>

      {/* Crumbs part: show only on mobile, not on desktop */}
      <span className="flex md:hidden items-center gap-1">
        {showBreadcrumbs &&
          segments.map((segment, i) => {
            const href = "/" + segments.slice(0, i + 1).join("/");
            const label = segment
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());
            return (
              <span key={href} className="flex items-center gap-1">
                <span className="text-gray-500">/</span>
                <Link
                  href={href}
                  className="text-black dark:text-white hover:text-blue-400 transition-colors"
                >
                  {label}
                </Link>
              </span>
            );
          })}
      </span>
    </div>
  );
}

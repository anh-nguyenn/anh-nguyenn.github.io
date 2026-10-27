"use client";

import { useEffect, useState } from "react";
import { GoStar } from "react-icons/go";

const starRequests = new Map<string, Promise<number>>();

function getStars(repoUrl: string) {
  const repository = repoUrl.replace("https://github.com/", "");
  if (!starRequests.has(repository)) {
    const request = fetch(`https://api.github.com/repos/${repository}`, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load GitHub stars");
        return response.json();
      })
      .then((data: { stargazers_count?: number }) => {
        if (typeof data.stargazers_count !== "number") {
          throw new Error("GitHub did not return a star count");
        }
        return data.stargazers_count;
      });
    starRequests.set(repository, request);
  }
  return starRequests.get(repository)!;
}

export default function StarCount({ repoUrl }: { repoUrl: string }) {
  const [stars, setStars] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    getStars(repoUrl)
      .then((count) => { if (active) setStars(count); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [repoUrl]);

  if (failed) {
    return <span className="star-count" aria-label="GitHub stars unavailable"><GoStar aria-hidden="true" />N/A</span>;
  }
  if (stars === null) {
    return <span className="star-count" aria-label="Loading GitHub stars"><GoStar aria-hidden="true" />…</span>;
  }
  return (
    <span className="star-count" aria-label={`${stars} GitHub stars`}>
      <GoStar aria-hidden="true" />
      <span aria-hidden="true">
        {new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(stars).toLowerCase()}
      </span>
    </span>
  );
}

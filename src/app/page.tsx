import openSource from "@/data/openSource";
import PortfolioPage from "@/components/PortfolioPage";

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

  return <PortfolioPage repositories={repositories} />;
}

import type {NextConfig} from "next";
import createMDX from '@next/mdx'
import remarkGfm from "remark-gfm";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryPath = "/jerry-nguyen-portfolio";

// Create MDX configuration
const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: []
    }
})

const nextConfig: NextConfig = {
    // Keep development and production artifacts separate. Running `next build`
    // must not overwrite chunks used by an active `next dev` server.
    distDir: process.env.NODE_ENV === "development" ? ".next" : ".next-build",
    output: "export",
    basePath: isGitHubPages ? repositoryPath : "",
    assetPrefix: isGitHubPages ? repositoryPath : "",
    trailingSlash: true,
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    transpilePackages: ["next-mdx-remote"]
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig)

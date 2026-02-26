import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { PortfolioConfig } from "@/types";
import { Octokit } from "@octokit/rest";
import PortfolioRenderer from "./renderer";

const DATA_DIR = path.join(process.cwd(), "data", "portfolios");

interface Props {
    params: Promise<{ username: string }>;
}

async function getPortfolioData(username: string) {
    const filePath = path.join(DATA_DIR, `${username}.json`);

    try {
        const data = await fs.readFile(filePath, "utf-8");
        const config: PortfolioConfig = JSON.parse(data);

        if (!config.isPublished) return null;

        // Fetch public GitHub data
        const octokit = new Octokit();

        const [userRes, reposRes] = await Promise.all([
            octokit.users.getByUsername({ username }).catch(() => null),
            octokit.repos
                .listForUser({ username, sort: "updated", per_page: 100, type: "owner" })
                .catch(() => null),
        ]);

        const user = userRes?.data || null;
        let repos = reposRes?.data || [];

        // Apply filters
        if (config.projects.filterForks) {
            repos = repos.filter((r) => !r.fork);
        }
        if (config.projects.filterArchived) {
            repos = repos.filter((r) => !r.archived);
        }

        // Sort
        switch (config.projects.sortBy) {
            case "stars":
                repos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
                break;
            case "created":
                repos.sort(
                    (a, b) =>
                        new Date(b.created_at || 0).getTime() -
                        new Date(a.created_at || 0).getTime()
                );
                break;
            case "name":
                repos.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                repos.sort(
                    (a, b) =>
                        new Date(b.updated_at || 0).getTime() -
                        new Date(a.updated_at || 0).getTime()
                );
        }

        // Get language stats
        const langTotals: Record<string, number> = {};
        repos.forEach((repo) => {
            if (repo.language) {
                langTotals[repo.language] = (langTotals[repo.language] || 0) + 1;
            }
        });

        return { config, user, repos, langTotals };
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props) {
    const { username } = await params;
    const data = await getPortfolioData(username);

    if (!data) return { title: "Portfolio Not Found" };

    const title =
        data.config.seo.title ||
        `${data.user?.name || username} - Portfolio`;
    const description =
        data.config.seo.description ||
        data.user?.bio ||
        `${username}'s developer portfolio`;

    return {
        title,
        description,
        keywords: data.config.seo.keywords.join(", "),
        openGraph: {
            title,
            description,
            images: data.config.seo.ogImage ? [data.config.seo.ogImage] : [],
        },
    };
}

export default async function PortfolioPage({ params }: Props) {
    const { username } = await params;
    const data = await getPortfolioData(username);

    if (!data) {
        notFound();
    }

    return <PortfolioRenderer data={data} />;
}

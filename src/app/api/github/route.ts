import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function GET() {
    const session = await auth();
    if (!session?.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const octokit = new Octokit({ auth: session.accessToken });

        const [reposResponse, userResponse] = await Promise.all([
            octokit.repos.listForAuthenticatedUser({
                sort: "updated",
                per_page: 100,
                type: "owner",
            }),
            octokit.users.getAuthenticated(),
        ]);

        // Get language stats for each repo
        const reposWithLangs = await Promise.all(
            reposResponse.data.slice(0, 30).map(async (repo) => {
                try {
                    const langs = await octokit.repos.listLanguages({
                        owner: repo.owner.login,
                        repo: repo.name,
                    });
                    return { ...repo, languages: langs.data };
                } catch {
                    return { ...repo, languages: {} };
                }
            })
        );

        // Aggregate language stats
        const langTotals: Record<string, number> = {};
        reposWithLangs.forEach((repo) => {
            Object.entries(repo.languages).forEach(([lang, bytes]) => {
                langTotals[lang] = (langTotals[lang] || 0) + (bytes as number);
            });
        });

        const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0);
        const languageStats = Object.entries(langTotals)
            .map(([name, bytes]) => ({
                name,
                bytes,
                percentage: Math.round((bytes / totalBytes) * 1000) / 10,
                color: getLanguageColor(name),
            }))
            .sort((a, b) => b.bytes - a.bytes);

        return NextResponse.json({
            user: userResponse.data,
            repos: reposResponse.data,
            languageStats,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch GitHub data" },
            { status: 500 }
        );
    }
}

function getLanguageColor(lang: string): string {
    const colors: Record<string, string> = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Python: "#3572A5",
        Java: "#b07219",
        "C#": "#178600",
        "C++": "#f34b7d",
        C: "#555555",
        Go: "#00ADD8",
        Rust: "#dea584",
        Ruby: "#701516",
        PHP: "#4F5D95",
        Swift: "#F05138",
        Kotlin: "#A97BFF",
        Dart: "#00B4AB",
        HTML: "#e34c26",
        CSS: "#563d7c",
        SCSS: "#c6538c",
        Shell: "#89e051",
        Lua: "#000080",
        Vue: "#41b883",
        Svelte: "#ff3e00",
        Dockerfile: "#384d54",
        Makefile: "#427819",
    };
    return colors[lang] || "#8b949e";
}

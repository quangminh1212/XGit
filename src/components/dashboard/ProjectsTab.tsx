"use client";

import {
    BookOpen,
    RefreshCw,
    Star,
    Check,
} from "lucide-react";
import { PortfolioConfig, GitHubRepo } from "@/types";

interface ProjectsTabProps {
    config: PortfolioConfig;
    repos: GitHubRepo[];
    loadingGithub: boolean;
    updateNested: (key: keyof PortfolioConfig, updates: Record<string, unknown>) => void;
    toggleFeatured: (repoName: string) => void;
    loadGithubData: () => void;
}

export default function ProjectsTab({
    config,
    repos,
    loadingGithub,
    updateNested,
    toggleFeatured,
    loadGithubData,
}: ProjectsTabProps) {
    return (
        <div className="space-y-6">
            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-400" />
                        Project Settings
                    </h3>
                    <button
                        onClick={loadGithubData}
                        className="btn-secondary text-xs py-1.5 px-3"
                    >
                        <RefreshCw className={`w-3 h-3 ${loadingGithub ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-zinc-400 mb-1 block">Sort By</label>
                            <select
                                value={config.projects.sortBy}
                                onChange={(e) =>
                                    updateNested("projects", { sortBy: e.target.value })
                                }
                                className="input appearance-none"
                            >
                                <option value="stars">Stars</option>
                                <option value="updated">Recently Updated</option>
                                <option value="created">Newest</option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-zinc-400 mb-1 block">
                                Max Display
                            </label>
                            <input
                                type="number"
                                className="input"
                                min={1}
                                max={50}
                                value={config.projects.maxDisplay}
                                onChange={(e) =>
                                    updateNested("projects", {
                                        maxDisplay: parseInt(e.target.value) || 6,
                                    })
                                }
                            />
                        </div>
                    </div>
                    {(["filterForks", "filterArchived", "showAll"] as const).map((key) => (
                        <div key={key} className="flex items-center justify-between">
                            <span className="text-sm text-zinc-300 capitalize">
                                {key === "filterForks"
                                    ? "Hide Forks"
                                    : key === "filterArchived"
                                        ? "Hide Archived"
                                        : "Show All Repos"}
                            </span>
                            <button
                                onClick={() =>
                                    updateNested("projects", { [key]: !config.projects[key] })
                                }
                                className={`toggle ${config.projects[key] ? "active" : ""}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured projects selection */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-2">Featured Projects</h3>
                <p className="text-sm text-zinc-400 mb-4">
                    Select repos to feature prominently on your portfolio.
                </p>
                {loadingGithub ? (
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="skeleton h-16 rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                        {repos
                            .filter((r) => !r.fork || !config.projects.filterForks)
                            .filter((r) => !r.archived || !config.projects.filterArchived)
                            .map((repo) => (
                                <button
                                    key={repo.id}
                                    onClick={() => toggleFeatured(repo.name)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${config.projects.featured.includes(repo.name)
                                            ? "bg-indigo-500/10 border border-indigo-500/20"
                                            : "bg-white/[0.02] border border-transparent hover:bg-white/[0.04]"
                                        }`}
                                >
                                    <div
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${config.projects.featured.includes(repo.name)
                                                ? "bg-indigo-500 border-indigo-500"
                                                : "border-zinc-600"
                                            }`}
                                    >
                                        {config.projects.featured.includes(repo.name) && (
                                            <Check className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium truncate">
                                                {repo.name}
                                            </span>
                                            {repo.language && (
                                                <span className="text-xs text-zinc-500">
                                                    {repo.language}
                                                </span>
                                            )}
                                        </div>
                                        {repo.description && (
                                            <p className="text-xs text-zinc-500 truncate">
                                                {repo.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3 h-3" />
                                            {repo.stargazers_count}
                                        </span>
                                    </div>
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

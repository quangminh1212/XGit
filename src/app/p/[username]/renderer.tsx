"use client";

import { PortfolioConfig } from "@/types";
import {
    Github,
    Star,
    GitFork,
    MapPin,
    Building2,
    Globe,
    Mail,
    Twitter,
    ExternalLink,
    ArrowUp,
    Linkedin,
    Code2,
} from "lucide-react";

const THEME_STYLES: Record<
    string,
    { bg: string; accent: string; accentRgb: string; card: string; text: string; muted: string; border: string }
> = {
    midnight: {
        bg: "bg-[#0a0a0f]",
        accent: "text-indigo-400",
        accentRgb: "99,102,241",
        card: "bg-[#111118]",
        text: "text-zinc-100",
        muted: "text-zinc-400",
        border: "border-white/5",
    },
    aurora: {
        bg: "bg-[#0a192f]",
        accent: "text-emerald-400",
        accentRgb: "52,211,153",
        card: "bg-[#112240]",
        text: "text-slate-100",
        muted: "text-slate-400",
        border: "border-white/5",
    },
    sunset: {
        bg: "bg-[#1a0a0a]",
        accent: "text-orange-400",
        accentRgb: "251,146,60",
        card: "bg-[#2e1a1a]",
        text: "text-stone-100",
        muted: "text-stone-400",
        border: "border-white/5",
    },
    ocean: {
        bg: "bg-[#0a1628]",
        accent: "text-sky-400",
        accentRgb: "56,189,248",
        card: "bg-[#1a2640]",
        text: "text-sky-50",
        muted: "text-sky-200/60",
        border: "border-white/5",
    },
    forest: {
        bg: "bg-[#0a1a0f]",
        accent: "text-green-400",
        accentRgb: "74,222,128",
        card: "bg-[#1a2e1a]",
        text: "text-green-50",
        muted: "text-green-200/60",
        border: "border-white/5",
    },
    custom: {
        bg: "bg-[#0a0a0f]",
        accent: "text-indigo-400",
        accentRgb: "99,102,241",
        card: "bg-[#111118]",
        text: "text-zinc-100",
        muted: "text-zinc-400",
        border: "border-white/5",
    },
};

const LANG_COLORS: Record<string, string> = {
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
    Shell: "#89e051",
    Vue: "#41b883",
    Svelte: "#ff3e00",
};

interface PortfolioData {
    config: PortfolioConfig;
    user: any;
    repos: any[];
    langTotals: Record<string, number>;
}

export default function PortfolioRenderer({ data }: { data: PortfolioData }) {
    const { config, user, repos, langTotals } = data;
    const theme = THEME_STYLES[config.theme] || THEME_STYLES.midnight;

    const displayRepos = config.projects.featured.length > 0
        ? [
            ...repos.filter((r) => config.projects.featured.includes(r.name)),
            ...repos
                .filter((r) => !config.projects.featured.includes(r.name))
                .slice(0, Math.max(0, config.projects.maxDisplay - config.projects.featured.length)),
        ]
        : repos.slice(0, config.projects.maxDisplay);

    const totalLangs = Object.values(langTotals).reduce((a, b) => a + b, 0);

    return (
        <>
            {/* Inject custom CSS */}
            {config.customCSS && <style dangerouslySetInnerHTML={{ __html: config.customCSS }} />}

            <div className={`min-h-screen ${theme.bg} ${theme.text}`}>
                {/* Hero Section */}
                {config.sections.hero && (
                    <section
                        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
                        style={{
                            background: `radial-gradient(ellipse at 50% 0%, rgba(${theme.accentRgb},0.15) 0%, transparent 70%)`,
                        }}
                    >
                        <div className="absolute inset-0 dot-pattern opacity-30" />
                        <div className="container relative z-10 text-center py-20">
                            {config.about.showAvatar && user?.avatar_url && (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name || config.username}
                                    className="w-28 h-28 rounded-full mx-auto mb-6 ring-4 ring-white/10 shadow-2xl"
                                />
                            )}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3">
                                {config.hero.title || user?.name || config.username}
                            </h1>
                            {(config.hero.subtitle || user?.bio) && (
                                <p className={`text-xl sm:text-2xl ${theme.muted} mb-2`}>
                                    {config.hero.subtitle || user?.bio}
                                </p>
                            )}
                            {config.hero.tagline && (
                                <p className={`text-base ${theme.muted} mb-8 max-w-xl mx-auto`}>
                                    {config.hero.tagline}
                                </p>
                            )}
                            {config.hero.cta && (
                                <a
                                    href={config.hero.ctaLink || "#projects"}
                                    className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all hover:opacity-90`}
                                    style={{
                                        background: `rgba(${theme.accentRgb},0.15)`,
                                        color: `rgb(${theme.accentRgb})`,
                                        border: `1px solid rgba(${theme.accentRgb},0.3)`,
                                    }}
                                >
                                    {config.hero.cta}
                                    <ArrowUp className="w-4 h-4 rotate-45" />
                                </a>
                            )}

                            {/* Stats */}
                            {config.about.showStats && user && (
                                <div className="flex justify-center gap-10 mt-12">
                                    <div className="text-center">
                                        <div className={`text-2xl font-bold ${theme.accent}`}>
                                            {user.public_repos}
                                        </div>
                                        <div className={`text-sm ${theme.muted}`}>Repos</div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-2xl font-bold ${theme.accent}`}>
                                            {user.followers}
                                        </div>
                                        <div className={`text-sm ${theme.muted}`}>Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-2xl font-bold ${theme.accent}`}>
                                            {user.following}
                                        </div>
                                        <div className={`text-sm ${theme.muted}`}>Following</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* About Section */}
                {config.sections.about && (
                    <section className="py-16" id="about">
                        <div className="container max-w-3xl">
                            <h2 className={`text-2xl font-bold mb-6 ${theme.accent}`}>About</h2>
                            <p className={`text-lg leading-relaxed ${theme.muted}`}>
                                {config.about.bio || user?.bio || "No bio provided."}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-6">
                                {config.about.showLocation && user?.location && (
                                    <span className={`flex items-center gap-2 text-sm ${theme.muted}`}>
                                        <MapPin className="w-4 h-4" />
                                        {user.location}
                                    </span>
                                )}
                                {config.about.showCompany && user?.company && (
                                    <span className={`flex items-center gap-2 text-sm ${theme.muted}`}>
                                        <Building2 className="w-4 h-4" />
                                        {user.company}
                                    </span>
                                )}
                                {user?.blog && (
                                    <a
                                        href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 text-sm ${theme.accent} hover:underline`}
                                    >
                                        <Globe className="w-4 h-4" />
                                        {user.blog}
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {config.sections.skills && (
                    <section className="py-16" id="skills">
                        <div className="container max-w-3xl">
                            <h2 className={`text-2xl font-bold mb-6 ${theme.accent}`}>Skills</h2>

                            {/* Language bar */}
                            {config.skills.showLanguages && Object.keys(langTotals).length > 0 && (
                                <div className="mb-6">
                                    <div className="h-3 rounded-full overflow-hidden flex mb-3">
                                        {Object.entries(langTotals)
                                            .sort(([, a], [, b]) => b - a)
                                            .map(([lang, count]) => (
                                                <div
                                                    key={lang}
                                                    style={{
                                                        width: `${(count / totalLangs) * 100}%`,
                                                        backgroundColor: LANG_COLORS[lang] || "#8b949e",
                                                    }}
                                                    title={`${lang}: ${Math.round((count / totalLangs) * 100)}%`}
                                                />
                                            ))}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {Object.entries(langTotals)
                                            .sort(([, a], [, b]) => b - a)
                                            .map(([lang, count]) => (
                                                <span
                                                    key={lang}
                                                    className={`flex items-center gap-1.5 text-sm ${theme.muted}`}
                                                >
                                                    <span
                                                        className="w-3 h-3 rounded-full"
                                                        style={{
                                                            backgroundColor: LANG_COLORS[lang] || "#8b949e",
                                                        }}
                                                    />
                                                    {lang}{" "}
                                                    <span className="opacity-60">
                                                        ({Math.round((count / totalLangs) * 100)}%)
                                                    </span>
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* Custom skills */}
                            {config.skills.customSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {config.skills.customSkills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 rounded-lg text-sm font-medium"
                                            style={{
                                                background: `rgba(${theme.accentRgb},0.1)`,
                                                color: `rgb(${theme.accentRgb})`,
                                                border: `1px solid rgba(${theme.accentRgb},0.2)`,
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {config.sections.projects && (
                    <section className="py-16" id="projects">
                        <div className="container max-w-5xl">
                            <h2 className={`text-2xl font-bold mb-8 ${theme.accent}`}>Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {displayRepos.map((repo) => (
                                    <a
                                        key={repo.id}
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${theme.card} rounded-xl p-5 border ${theme.border} hover:border-white/15 transition-all group`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Code2
                                                    className="w-4 h-4"
                                                    style={{ color: `rgb(${theme.accentRgb})` }}
                                                />
                                                <span className="font-semibold group-hover:underline">
                                                    {repo.name}
                                                </span>
                                            </div>
                                            <ExternalLink className={`w-4 h-4 ${theme.muted} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                        </div>
                                        {repo.description && (
                                            <p className={`text-sm ${theme.muted} mb-4 line-clamp-2`}>
                                                {repo.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4">
                                            {repo.language && (
                                                <span className={`flex items-center gap-1.5 text-xs ${theme.muted}`}>
                                                    <span
                                                        className="w-2.5 h-2.5 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                LANG_COLORS[repo.language] || "#8b949e",
                                                        }}
                                                    />
                                                    {repo.language}
                                                </span>
                                            )}
                                            {repo.stargazers_count > 0 && (
                                                <span className={`flex items-center gap-1 text-xs ${theme.muted}`}>
                                                    <Star className="w-3 h-3" />
                                                    {repo.stargazers_count}
                                                </span>
                                            )}
                                            {repo.forks_count > 0 && (
                                                <span className={`flex items-center gap-1 text-xs ${theme.muted}`}>
                                                    <GitFork className="w-3 h-3" />
                                                    {repo.forks_count}
                                                </span>
                                            )}
                                        </div>
                                        {repo.topics?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {repo.topics.slice(0, 4).map((topic: string) => (
                                                    <span
                                                        key={topic}
                                                        className="text-xs px-2 py-0.5 rounded-md"
                                                        style={{
                                                            background: `rgba(${theme.accentRgb},0.08)`,
                                                            color: `rgb(${theme.accentRgb})`,
                                                        }}
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                {config.sections.contact && (
                    <section className="py-16" id="contact">
                        <div className="container max-w-3xl text-center">
                            <h2 className={`text-2xl font-bold mb-4 ${theme.accent}`}>
                                Get In Touch
                            </h2>
                            <p className={`${theme.muted} mb-8`}>
                                Interested in working together? Feel free to reach out!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {config.contact.email && (
                                    <a
                                        href={`mailto:${config.contact.email}`}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                                        style={{
                                            background: `rgba(${theme.accentRgb},0.1)`,
                                            border: `1px solid rgba(${theme.accentRgb},0.2)`,
                                            color: `rgb(${theme.accentRgb})`,
                                        }}
                                    >
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </a>
                                )}
                                {config.contact.showGithub && (
                                    <a
                                        href={`https://github.com/${config.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                                        style={{
                                            background: `rgba(${theme.accentRgb},0.1)`,
                                            border: `1px solid rgba(${theme.accentRgb},0.2)`,
                                            color: `rgb(${theme.accentRgb})`,
                                        }}
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub
                                    </a>
                                )}
                                {config.contact.showTwitter && user?.twitter_username && (
                                    <a
                                        href={`https://twitter.com/${user.twitter_username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                                        style={{
                                            background: `rgba(${theme.accentRgb},0.1)`,
                                            border: `1px solid rgba(${theme.accentRgb},0.2)`,
                                            color: `rgb(${theme.accentRgb})`,
                                        }}
                                    >
                                        <Twitter className="w-4 h-4" />
                                        Twitter
                                    </a>
                                )}
                                {config.contact.showLinkedin && config.contact.linkedinUrl && (
                                    <a
                                        href={config.contact.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                                        style={{
                                            background: `rgba(${theme.accentRgb},0.1)`,
                                            border: `1px solid rgba(${theme.accentRgb},0.2)`,
                                            color: `rgb(${theme.accentRgb})`,
                                        }}
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        LinkedIn
                                    </a>
                                )}
                                {config.contact.customLinks.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                                        style={{
                                            background: `rgba(${theme.accentRgb},0.1)`,
                                            border: `1px solid rgba(${theme.accentRgb},0.2)`,
                                            color: `rgb(${theme.accentRgb})`,
                                        }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className={`py-8 border-t ${theme.border} text-center`}>
                    <p className={`text-sm ${theme.muted}`}>
                        Built with{" "}
                        <a
                            href="/"
                            className={theme.accent}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            XGit
                        </a>
                    </p>
                </footer>

                {/* Inject custom HTML */}
                {config.customHTML && (
                    <div dangerouslySetInnerHTML={{ __html: config.customHTML }} />
                )}

                {/* Inject custom JS */}
                {config.customJS && (
                    <script dangerouslySetInnerHTML={{ __html: config.customJS }} />
                )}

                {/* Google Analytics */}
                {config.analytics.googleAnalyticsId && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${config.analytics.googleAnalyticsId}');
                `,
                            }}
                        />
                    </>
                )}
            </div>
        </>
    );
}

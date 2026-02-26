"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
    Github,
    GitBranch,
    LogOut,
    Settings,
    Eye,
    Save,
    Palette,
    Code2,
    Globe,
    Layout,
    Star,
    Users,
    BookOpen,
    ExternalLink,
    Check,
    Loader2,
    ChevronDown,
    Trash2,
    Plus,
    RefreshCw,
} from "lucide-react";
import { PortfolioConfig, GitHubRepo, LanguageStat } from "@/types";

const THEMES = [
    { id: "midnight", name: "Midnight", colors: ["#0a0a0f", "#1a1a2e", "#6366f1"] },
    { id: "aurora", name: "Aurora", colors: ["#0a192f", "#112240", "#64ffda"] },
    { id: "sunset", name: "Sunset", colors: ["#1a0a0a", "#2e1a1a", "#f97316"] },
    { id: "ocean", name: "Ocean", colors: ["#0a1628", "#1a2640", "#0ea5e9"] },
    { id: "forest", name: "Forest", colors: ["#0a1a0f", "#1a2e1a", "#22c55e"] },
    { id: "custom", name: "Custom", colors: ["#111", "#222", "#999"] },
] as const;

const TEMPLATES = [
    { id: "developer", name: "Developer", desc: "Clean & professional" },
    { id: "designer", name: "Designer", desc: "Creative & visual" },
    { id: "minimal", name: "Minimal", desc: "Simple & elegant" },
    { id: "creative", name: "Creative", desc: "Bold & unique" },
    { id: "custom", name: "Custom Code", desc: "Full control" },
] as const;

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh", name: "中文" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
] as const;

type TabType = "general" | "sections" | "projects" | "code" | "seo";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("general");
    const [config, setConfig] = useState<PortfolioConfig | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [languageStats, setLanguageStats] = useState<LanguageStat[]>([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingGithub, setLoadingGithub] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Load config
    useEffect(() => {
        if (session) {
            fetch("/api/portfolio")
                .then((r) => r.json())
                .then((data) => {
                    setConfig(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [session]);

    // Load GitHub data
    useEffect(() => {
        if (session) {
            fetch("/api/github")
                .then((r) => r.json())
                .then((data) => {
                    if (data.repos) setRepos(data.repos);
                    if (data.languageStats) setLanguageStats(data.languageStats);
                    setLoadingGithub(false);
                })
                .catch(() => setLoadingGithub(false));
        }
    }, [session]);

    const updateConfig = useCallback(
        (updates: Partial<PortfolioConfig>) => {
            if (!config) return;
            setConfig({ ...config, ...updates });
            setSaved(false);
        },
        [config]
    );

    const updateNested = useCallback(
        (key: keyof PortfolioConfig, updates: any) => {
            if (!config) return;
            setConfig({
                ...config,
                [key]: { ...(config[key] as any), ...updates },
            });
            setSaved(false);
        },
        [config]
    );

    const saveConfig = async () => {
        if (!config) return;
        setSaving(true);
        try {
            const res = await fetch("/api/portfolio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            }
        } catch (err) {
            console.error("Save failed:", err);
        }
        setSaving(false);
    };

    const toggleFeatured = (repoName: string) => {
        if (!config) return;
        const featured = config.projects.featured.includes(repoName)
            ? config.projects.featured.filter((r) => r !== repoName)
            : [...config.projects.featured, repoName];
        updateNested("projects", { featured });
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (!session || !config) return null;

    const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
        { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
        { id: "sections", label: "Sections", icon: <Layout className="w-4 h-4" /> },
        { id: "projects", label: "Projects", icon: <BookOpen className="w-4 h-4" /> },
        { id: "code", label: "Custom Code", icon: <Code2 className="w-4 h-4" /> },
        { id: "seo", label: "SEO", icon: <Globe className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Top bar */}
            <header className="sticky top-0 z-50 glass border-b border-white/5">
                <div className="container flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <GitBranch className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold gradient-text">XGit</span>
                        <span className="text-zinc-600 text-sm">/</span>
                        <span className="text-sm text-zinc-400">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={saveConfig}
                            disabled={saving}
                            className="btn-primary text-xs py-1.5 px-4"
                        >
                            {saving ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : saved ? (
                                <Check className="w-3.5 h-3.5" />
                            ) : (
                                <Save className="w-3.5 h-3.5" />
                            )}
                            {saving ? "Saving..." : saved ? "Saved!" : "Save"}
                        </button>
                        {config.isPublished && (
                            <a
                                href={`/p/${session.user.githubUsername}`}
                                target="_blank"
                                className="btn-secondary text-xs py-1.5 px-3"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                Preview
                            </a>
                        )}
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="text-zinc-500 hover:text-white transition-colors p-1.5"
                            title="Sign out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="container py-6">
                {/* User profile card */}
                <div className="card mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                        src={session.user.githubAvatar || session.user.image || ""}
                        alt="Avatar"
                        className="w-14 h-14 rounded-full ring-2 ring-indigo-500/30"
                    />
                    <div className="flex-1">
                        <h2 className="text-lg font-bold">
                            {session.user.githubName || session.user.name}
                        </h2>
                        <p className="text-sm text-zinc-400">
                            @{session.user.githubUsername} • {session.user.publicRepos} repos •{" "}
                            {session.user.followers} followers
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${config.isPublished
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                                }`}
                        >
                            {config.isPublished ? "Published" : "Draft"}
                        </div>
                        <button
                            onClick={() => updateConfig({ isPublished: !config.isPublished })}
                            className="btn-secondary text-xs py-1.5 px-3"
                        >
                            {config.isPublished ? "Unpublish" : "Publish"}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar tabs */}
                    <nav className="lg:w-56 shrink-0">
                        <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Content */}
                    <main className="flex-1 min-w-0">
                        {activeTab === "general" && (
                            <div className="space-y-6">
                                {/* Theme */}
                                <div className="card">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Palette className="w-5 h-5 text-indigo-400" />
                                        Theme
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {THEMES.map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => updateConfig({ theme: theme.id })}
                                                className={`p-3 rounded-xl border transition-all ${config.theme === theme.id
                                                        ? "border-indigo-500 bg-indigo-500/5"
                                                        : "border-white/5 hover:border-white/15"
                                                    }`}
                                            >
                                                <div className="flex gap-1 mb-2">
                                                    {theme.colors.map((c, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-5 h-5 rounded-full"
                                                            style={{ backgroundColor: c }}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm font-medium">{theme.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Template */}
                                <div className="card">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Layout className="w-5 h-5 text-indigo-400" />
                                        Template
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {TEMPLATES.map((tpl) => (
                                            <button
                                                key={tpl.id}
                                                onClick={() => updateConfig({ template: tpl.id as any })}
                                                className={`p-4 rounded-xl border text-left transition-all ${config.template === tpl.id
                                                        ? "border-indigo-500 bg-indigo-500/5"
                                                        : "border-white/5 hover:border-white/15"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium block">{tpl.name}</span>
                                                <span className="text-xs text-zinc-500">{tpl.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Language */}
                                <div className="card">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-indigo-400" />
                                        Language
                                    </h3>
                                    <div className="relative">
                                        <select
                                            value={config.language}
                                            onChange={(e) => updateConfig({ language: e.target.value as any })}
                                            className="input appearance-none cursor-pointer pr-10"
                                        >
                                            {LANGUAGES.map((lang) => (
                                                <option key={lang.code} value={lang.code}>
                                                    {lang.name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Hero settings */}
                                <div className="card">
                                    <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1 block">Title</label>
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder={session.user.githubName || "Your Name"}
                                                value={config.hero.title}
                                                onChange={(e) => updateNested("hero", { title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1 block">Subtitle</label>
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="Full-Stack Developer"
                                                value={config.hero.subtitle}
                                                onChange={(e) => updateNested("hero", { subtitle: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1 block">Tagline</label>
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="I build things for the web"
                                                value={config.hero.tagline}
                                                onChange={(e) => updateNested("hero", { tagline: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-zinc-400 mb-1 block">CTA Text</label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={config.hero.cta}
                                                    onChange={(e) => updateNested("hero", { cta: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-zinc-400 mb-1 block">CTA Link</label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={config.hero.ctaLink}
                                                    onChange={(e) => updateNested("hero", { ctaLink: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* About settings */}
                                <div className="card">
                                    <h3 className="text-lg font-semibold mb-4">About</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1 block">Bio</label>
                                            <textarea
                                                className="textarea"
                                                placeholder={session.user.githubBio || "Tell the world about yourself..."}
                                                value={config.about.bio}
                                                onChange={(e) => updateNested("about", { bio: e.target.value })}
                                            />
                                        </div>
                                        {(["showAvatar", "showStats", "showLocation", "showCompany"] as const).map(
                                            (key) => (
                                                <div key={key} className="flex items-center justify-between">
                                                    <span className="text-sm text-zinc-300 capitalize">
                                                        {key.replace("show", "Show ")}
                                                    </span>
                                                    <button
                                                        onClick={() => updateNested("about", { [key]: !config.about[key] })}
                                                        className={`toggle ${config.about[key] ? "active" : ""}`}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Contact settings */}
                                <div className="card">
                                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1 block">Email</label>
                                            <input
                                                type="email"
                                                className="input"
                                                placeholder="you@example.com"
                                                value={config.contact.email}
                                                onChange={(e) => updateNested("contact", { email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1 block">LinkedIn URL</label>
                                            <input
                                                type="url"
                                                className="input"
                                                placeholder="https://linkedin.com/in/username"
                                                value={config.contact.linkedinUrl}
                                                onChange={(e) =>
                                                    updateNested("contact", { linkedinUrl: e.target.value })
                                                }
                                            />
                                        </div>
                                        {(["showGithub", "showTwitter", "showLinkedin", "showBlog"] as const).map(
                                            (key) => (
                                                <div key={key} className="flex items-center justify-between">
                                                    <span className="text-sm text-zinc-300 capitalize">
                                                        {key.replace("show", "Show ")}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateNested("contact", { [key]: !config.contact[key] })
                                                        }
                                                        className={`toggle ${config.contact[key] ? "active" : ""}`}
                                                    />
                                                </div>
                                            )
                                        )}

                                        {/* Custom links */}
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-2 block">Custom Links</label>
                                            {config.contact.customLinks.map((link, i) => (
                                                <div key={i} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        className="input flex-1"
                                                        placeholder="Label"
                                                        value={link.label}
                                                        onChange={(e) => {
                                                            const links = [...config.contact.customLinks];
                                                            links[i] = { ...links[i], label: e.target.value };
                                                            updateNested("contact", { customLinks: links });
                                                        }}
                                                    />
                                                    <input
                                                        type="url"
                                                        className="input flex-2"
                                                        placeholder="https://..."
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const links = [...config.contact.customLinks];
                                                            links[i] = { ...links[i], url: e.target.value };
                                                            updateNested("contact", { customLinks: links });
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const links = config.contact.customLinks.filter(
                                                                (_, idx) => idx !== i
                                                            );
                                                            updateNested("contact", { customLinks: links });
                                                        }}
                                                        className="text-red-400 hover:text-red-300 p-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    updateNested("contact", {
                                                        customLinks: [
                                                            ...config.contact.customLinks,
                                                            { label: "", url: "", icon: "" },
                                                        ],
                                                    });
                                                }}
                                                className="btn-secondary text-xs py-1.5 px-3"
                                            >
                                                <Plus className="w-3 h-3" />
                                                Add Link
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="card">
                                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                                    <div className="space-y-4">
                                        {(["showLanguages", "showTopics"] as const).map((key) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <span className="text-sm text-zinc-300 capitalize">
                                                    {key.replace("show", "Show ")}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateNested("skills", { [key]: !config.skills[key] })
                                                    }
                                                    className={`toggle ${config.skills[key] ? "active" : ""}`}
                                                />
                                            </div>
                                        ))}

                                        {/* Language stats preview */}
                                        {languageStats.length > 0 && (
                                            <div>
                                                <label className="text-sm text-zinc-400 mb-2 block">
                                                    Detected Languages
                                                </label>
                                                <div className="flex flex-wrap gap-2">
                                                    {languageStats.slice(0, 10).map((lang) => (
                                                        <span
                                                            key={lang.name}
                                                            className="badge"
                                                            style={{
                                                                borderColor: `${lang.color}40`,
                                                                color: lang.color,
                                                                backgroundColor: `${lang.color}10`,
                                                            }}
                                                        >
                                                            <span
                                                                className="w-2 h-2 rounded-full"
                                                                style={{ backgroundColor: lang.color }}
                                                            />
                                                            {lang.name} ({lang.percentage}%)
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Custom skills */}
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1 block">
                                                Custom Skills (comma separated)
                                            </label>
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="React, Docker, AWS..."
                                                value={config.skills.customSkills.join(", ")}
                                                onChange={(e) =>
                                                    updateNested("skills", {
                                                        customSkills: e.target.value
                                                            .split(",")
                                                            .map((s) => s.trim())
                                                            .filter(Boolean),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "sections" && (
                            <div className="card">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Layout className="w-5 h-5 text-indigo-400" />
                                    Toggle Sections
                                </h3>
                                <p className="text-sm text-zinc-400 mb-6">
                                    Choose which sections appear on your portfolio page.
                                </p>
                                <div className="space-y-3">
                                    {(Object.keys(config.sections) as (keyof typeof config.sections)[]).map(
                                        (section) => (
                                            <div
                                                key={section}
                                                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                                            >
                                                <span className="text-sm font-medium capitalize">{section}</span>
                                                <button
                                                    onClick={() =>
                                                        updateNested("sections", {
                                                            [section]: !config.sections[section],
                                                        })
                                                    }
                                                    className={`toggle ${config.sections[section] ? "active" : ""}`}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "projects" && (
                            <div className="space-y-6">
                                <div className="card">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-indigo-400" />
                                            Project Settings
                                        </h3>
                                        <button
                                            onClick={() => {
                                                setLoadingGithub(true);
                                                fetch("/api/github")
                                                    .then((r) => r.json())
                                                    .then((data) => {
                                                        if (data.repos) setRepos(data.repos);
                                                        if (data.languageStats) setLanguageStats(data.languageStats);
                                                        setLoadingGithub(false);
                                                    });
                                            }}
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
                        )}

                        {activeTab === "code" && (
                            <div className="space-y-6">
                                <div className="card">
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <Code2 className="w-5 h-5 text-indigo-400" />
                                        Custom Code Editor
                                    </h3>
                                    <p className="text-sm text-zinc-400 mb-6">
                                        Write custom HTML, CSS, and JavaScript to fully customize your portfolio.
                                        This code will be injected into your published portfolio page.
                                    </p>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm font-medium text-zinc-300">
                                                    Custom CSS
                                                </label>
                                                <span className="text-xs text-zinc-500">
                                                    Overrides default styles
                                                </span>
                                            </div>
                                            <textarea
                                                className="code-editor"
                                                placeholder={`/* Custom CSS */\n.portfolio-hero {\n  background: linear-gradient(135deg, #667eea, #764ba2);\n}\n\n.project-card:hover {\n  transform: scale(1.02);\n  transition: transform 0.3s ease;\n}`}
                                                value={config.customCSS}
                                                onChange={(e) => updateConfig({ customCSS: e.target.value })}
                                                rows={10}
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm font-medium text-zinc-300">
                                                    Custom HTML
                                                </label>
                                                <span className="text-xs text-zinc-500">
                                                    Injected before closing body tag
                                                </span>
                                            </div>
                                            <textarea
                                                className="code-editor"
                                                placeholder={`<!-- Custom HTML -->\n<section class="custom-section">\n  <h2>My Custom Section</h2>\n  <p>Add any HTML you want!</p>\n</section>`}
                                                value={config.customHTML}
                                                onChange={(e) => updateConfig({ customHTML: e.target.value })}
                                                rows={10}
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm font-medium text-zinc-300">
                                                    Custom JavaScript
                                                </label>
                                                <span className="text-xs text-zinc-500">
                                                    Runs after page load
                                                </span>
                                            </div>
                                            <textarea
                                                className="code-editor"
                                                placeholder={`// Custom JavaScript\nconsole.log('Portfolio loaded!');\n\n// Example: typing effect\nfunction typeWriter(element, text, speed) {\n  let i = 0;\n  function type() {\n    if (i < text.length) {\n      element.textContent += text.charAt(i);\n      i++;\n      setTimeout(type, speed);\n    }\n  }\n  type();\n}`}
                                                value={config.customJS}
                                                onChange={(e) => updateConfig({ customJS: e.target.value })}
                                                rows={10}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "seo" && (
                            <div className="card">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-indigo-400" />
                                    SEO Settings
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1 block">Page Title</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder={`${session.user.githubName || session.user.githubUsername} - Portfolio`}
                                            value={config.seo.title}
                                            onChange={(e) => updateNested("seo", { title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1 block">
                                            Meta Description
                                        </label>
                                        <textarea
                                            className="textarea"
                                            placeholder="A portfolio showcasing my work and projects..."
                                            value={config.seo.description}
                                            onChange={(e) => updateNested("seo", { description: e.target.value })}
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1 block">
                                            Keywords (comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="developer, portfolio, react, typescript..."
                                            value={config.seo.keywords.join(", ")}
                                            onChange={(e) =>
                                                updateNested("seo", {
                                                    keywords: e.target.value
                                                        .split(",")
                                                        .map((s) => s.trim())
                                                        .filter(Boolean),
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1 block">
                                            OG Image URL
                                        </label>
                                        <input
                                            type="url"
                                            className="input"
                                            placeholder="https://example.com/og-image.png"
                                            value={config.seo.ogImage}
                                            onChange={(e) => updateNested("seo", { ogImage: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1 block">
                                            Google Analytics ID
                                        </label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="G-XXXXXXXXXX"
                                            value={config.analytics.googleAnalyticsId}
                                            onChange={(e) =>
                                                updateNested("analytics", {
                                                    googleAnalyticsId: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

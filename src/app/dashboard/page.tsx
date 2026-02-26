"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    GitBranch,
    LogOut,
    Settings,
    Eye,
    Save,
    Layout,
    BookOpen,
    Code2,
    Globe,
    Check,
    Loader2,
    Wrench,
} from "lucide-react";
import { useState } from "react";
import { usePortfolioConfig } from "@/hooks/usePortfolioConfig";
import {
    GeneralTab,
    SectionsTab,
    ProjectsTab,
    CodeTab,
    SEOTab,
    ToolsTab,
} from "@/components/dashboard";
import { DEFAULT_SECTION_ORDER } from "@/lib/constants";

type TabType = "general" | "sections" | "projects" | "code" | "seo" | "tools";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("general");

    const {
        config,
        repos,
        languageStats,
        saving,
        saved,
        loading,
        loadingGithub,
        updateConfig,
        updateNested,
        saveConfig,
        toggleFeatured,
        loadConfig,
        loadGithubData,
        reorderSections,
        toggleSection,
        exportConfig,
        importConfig,
        exportStaticHTML,
    } = usePortfolioConfig();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Load config
    useEffect(() => {
        if (session) {
            loadConfig();
        }
    }, [session, loadConfig]);

    // Load GitHub data
    useEffect(() => {
        if (session) {
            loadGithubData();
        }
    }, [session, loadGithubData]);

    // Ensure sectionOrder is set
    useEffect(() => {
        if (config && (!config.sectionOrder || config.sectionOrder.length === 0)) {
            updateConfig({ sectionOrder: [...DEFAULT_SECTION_ORDER] });
        }
    }, [config, updateConfig]);

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
        { id: "tools", label: "Tools", icon: <Wrench className="w-4 h-4" /> },
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
                            <GeneralTab
                                config={config}
                                session={session}
                                languageStats={languageStats}
                                updateConfig={updateConfig}
                                updateNested={updateNested}
                            />
                        )}

                        {activeTab === "sections" && (
                            <SectionsTab
                                config={config}
                                reorderSections={reorderSections}
                                toggleSection={toggleSection}
                            />
                        )}

                        {activeTab === "projects" && (
                            <ProjectsTab
                                config={config}
                                repos={repos}
                                loadingGithub={loadingGithub}
                                updateNested={updateNested}
                                toggleFeatured={toggleFeatured}
                                loadGithubData={loadGithubData}
                            />
                        )}

                        {activeTab === "code" && (
                            <CodeTab config={config} updateConfig={updateConfig} />
                        )}

                        {activeTab === "seo" && (
                            <SEOTab
                                config={config}
                                session={session}
                                updateNested={updateNested}
                            />
                        )}

                        {activeTab === "tools" && (
                            <ToolsTab
                                config={config}
                                exportConfig={exportConfig}
                                importConfig={importConfig}
                                exportStaticHTML={exportStaticHTML}
                            />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

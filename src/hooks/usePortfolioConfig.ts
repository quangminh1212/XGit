"use client";

import { useState, useCallback } from "react";
import { PortfolioConfig, GitHubRepo, LanguageStat, SectionKey } from "@/types";

export interface PortfolioState {
    config: PortfolioConfig | null;
    repos: GitHubRepo[];
    languageStats: LanguageStat[];
    saving: boolean;
    saved: boolean;
    loading: boolean;
    loadingGithub: boolean;
}

export function usePortfolioConfig() {
    const [config, setConfig] = useState<PortfolioConfig | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [languageStats, setLanguageStats] = useState<LanguageStat[]>([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingGithub, setLoadingGithub] = useState(true);

    const updateConfig = useCallback(
        (updates: Partial<PortfolioConfig>) => {
            if (!config) return;
            setConfig({ ...config, ...updates });
            setSaved(false);
        },
        [config]
    );

    const updateNested = useCallback(
        (key: keyof PortfolioConfig, updates: Record<string, unknown>) => {
            if (!config) return;
            setConfig({
                ...config,
                [key]: { ...(config[key] as Record<string, unknown>), ...updates },
            });
            setSaved(false);
        },
        [config]
    );

    const saveConfig = useCallback(async () => {
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
    }, [config]);

    const toggleFeatured = useCallback(
        (repoName: string) => {
            if (!config) return;
            const featured = config.projects.featured.includes(repoName)
                ? config.projects.featured.filter((r) => r !== repoName)
                : [...config.projects.featured, repoName];
            updateNested("projects", { featured });
        },
        [config, updateNested]
    );

    const loadConfig = useCallback(async () => {
        try {
            const r = await fetch("/api/portfolio");
            const data = await r.json();
            setConfig(data);
        } catch {
            // ignore
        }
        setLoading(false);
    }, []);

    const loadGithubData = useCallback(async () => {
        setLoadingGithub(true);
        try {
            const r = await fetch("/api/github");
            const data = await r.json();
            if (data.repos) setRepos(data.repos);
            if (data.languageStats) setLanguageStats(data.languageStats);
        } catch {
            // ignore
        }
        setLoadingGithub(false);
    }, []);

    // Drag & drop section reorder
    const reorderSections = useCallback(
        (fromIndex: number, toIndex: number) => {
            if (!config) return;
            const order = [...(config.sectionOrder || [])];
            const [moved] = order.splice(fromIndex, 1);
            order.splice(toIndex, 0, moved);
            setConfig({ ...config, sectionOrder: order });
            setSaved(false);
        },
        [config]
    );

    const toggleSection = useCallback(
        (section: SectionKey) => {
            if (!config) return;
            setConfig({
                ...config,
                sections: {
                    ...config.sections,
                    [section]: !config.sections[section],
                },
            });
            setSaved(false);
        },
        [config]
    );

    // Export portfolio config as JSON
    const exportConfig = useCallback(() => {
        if (!config) return;
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${config.username}-portfolio.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [config]);

    // Import portfolio config from JSON file
    const importConfig = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string) as PortfolioConfig;
                    if (config) {
                        // Keep username from session
                        data.username = config.username;
                    }
                    setConfig(data);
                    setSaved(false);
                } catch {
                    console.error("Invalid JSON file");
                }
            };
            reader.readAsText(file);
        },
        [config]
    );

    // Export portfolio as static HTML
    const exportStaticHTML = useCallback(async () => {
        if (!config) return;
        try {
            const res = await fetch(`/p/${config.username}`);
            const html = await res.text();
            const blob = new Blob([html], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${config.username}-portfolio.html`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export failed:", err);
        }
    }, [config]);

    return {
        // State
        config,
        repos,
        languageStats,
        saving,
        saved,
        loading,
        loadingGithub,
        // Actions
        setConfig,
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
    };
}

"use client";

import {
    Palette,
    Layout,
    Globe,
    ChevronDown,
    Trash2,
    Plus,
} from "lucide-react";
import { PortfolioConfig, LanguageStat } from "@/types";
import { THEMES, TEMPLATES, LANGUAGES } from "@/lib/constants";

interface GeneralTabProps {
    config: PortfolioConfig;
    session: any;
    languageStats: LanguageStat[];
    updateConfig: (updates: Partial<PortfolioConfig>) => void;
    updateNested: (key: keyof PortfolioConfig, updates: Record<string, unknown>) => void;
}

export default function GeneralTab({
    config,
    session,
    languageStats,
    updateConfig,
    updateNested,
}: GeneralTabProps) {
    return (
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
                            onClick={() => updateConfig({ template: tpl.id as PortfolioConfig["template"] })}
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
                        onChange={(e) => updateConfig({ language: e.target.value as PortfolioConfig["language"] })}
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
    );
}

"use client";

import { Globe } from "lucide-react";
import { PortfolioConfig } from "@/types";

interface SEOTabProps {
    config: PortfolioConfig;
    session: any;
    updateNested: (key: keyof PortfolioConfig, updates: Record<string, unknown>) => void;
}

export default function SEOTab({ config, session, updateNested }: SEOTabProps) {
    return (
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
    );
}

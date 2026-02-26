"use client";

import { useRef } from "react";
import {
    Download,
    Upload,
    FileCode2,
    Server,
    Copy,
    ExternalLink,
    Package,
} from "lucide-react";
import { PortfolioConfig } from "@/types";

interface ToolsTabProps {
    config: PortfolioConfig;
    exportConfig: () => void;
    importConfig: (file: File) => void;
    exportStaticHTML: () => void;
}

export default function ToolsTab({
    config,
    exportConfig,
    importConfig,
    exportStaticHTML,
}: ToolsTabProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            importConfig(file);
            e.target.value = "";
        }
    };

    const copyPortfolioURL = () => {
        const url = `${window.location.origin}/p/${config.username}`;
        navigator.clipboard.writeText(url);
    };

    return (
        <div className="space-y-6">
            {/* Export/Import Config */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-400" />
                    Configuration
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                    Export or import your portfolio configuration as JSON. Useful for
                    backup, migration, or sharing settings.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={exportConfig}
                        className="flex items-center gap-3 p-4 rounded-xl border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 text-left transition-all"
                    >
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                            <Download className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <span className="text-sm font-medium block">Export Config</span>
                            <span className="text-xs text-zinc-500">Download as JSON</span>
                        </div>
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 p-4 rounded-xl border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 text-left transition-all"
                    >
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Upload className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-sm font-medium block">Import Config</span>
                            <span className="text-xs text-zinc-500">Load from JSON file</span>
                        </div>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Export Static HTML */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <FileCode2 className="w-5 h-5 text-indigo-400" />
                    Export as Static HTML
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                    Download your portfolio as a standalone HTML file. You can host it
                    anywhere — GitHub Pages, Netlify, Vercel, or any web server.
                </p>
                <button
                    onClick={exportStaticHTML}
                    disabled={!config.isPublished}
                    className="btn-primary text-sm py-2.5 px-5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <FileCode2 className="w-4 h-4" />
                    Download HTML
                </button>
                {!config.isPublished && (
                    <p className="text-xs text-amber-400 mt-2">
                        ⚠️ Publish your portfolio first to export as HTML.
                    </p>
                )}
            </div>

            {/* Share & URL */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-indigo-400" />
                    Portfolio URL
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                    Your portfolio is live at this URL. Share it with recruiters,
                    clients, or the world!
                </p>
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            className="input pr-20"
                            readOnly
                            value={`${typeof window !== "undefined" ? window.location.origin : ""}/p/${config.username}`}
                        />
                        <button
                            onClick={copyPortfolioURL}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-white/10 transition-colors"
                            title="Copy URL"
                        >
                            <Copy className="w-4 h-4 text-zinc-400" />
                        </button>
                    </div>
                    {config.isPublished && (
                        <a
                            href={`/p/${config.username}`}
                            target="_blank"
                            className="btn-secondary text-xs py-2.5 px-3"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Open
                        </a>
                    )}
                </div>
            </div>

            {/* Self-Hosting Guide */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Server className="w-5 h-5 text-indigo-400" />
                    Self-Hosting Guide
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                    Want to host your portfolio on your own domain? Follow these steps:
                </p>
                <div className="space-y-3">
                    {HOSTING_STEPS.map((step, i) => (
                        <div
                            key={i}
                            className="flex gap-3 p-3 rounded-lg bg-white/[0.02]"
                        >
                            <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-indigo-400">
                                    {i + 1}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm font-medium block">
                                    {step.title}
                                </span>
                                <span className="text-xs text-zinc-500">{step.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const HOSTING_STEPS = [
    {
        title: "Export your portfolio",
        desc: 'Click "Download HTML" above to get your portfolio as a static file.',
    },
    {
        title: "Choose a hosting platform",
        desc: "Use GitHub Pages (free), Netlify, Vercel, or any static site host.",
    },
    {
        title: "Upload and deploy",
        desc: "Upload the HTML file to your chosen platform. Most offer drag-and-drop deploy.",
    },
    {
        title: "Connect your domain (optional)",
        desc: "Point your custom domain (e.g., yourname.dev) to the hosting platform via DNS settings.",
    },
    {
        title: "Keep updating",
        desc: "Come back here anytime to edit your config, re-export, and re-deploy.",
    },
];

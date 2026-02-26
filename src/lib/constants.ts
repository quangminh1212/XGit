// Shared constants used across dashboard and renderer

export const THEMES = [
    { id: "midnight", name: "Midnight", colors: ["#0a0a0f", "#1a1a2e", "#6366f1"] },
    { id: "aurora", name: "Aurora", colors: ["#0a192f", "#112240", "#64ffda"] },
    { id: "sunset", name: "Sunset", colors: ["#1a0a0a", "#2e1a1a", "#f97316"] },
    { id: "ocean", name: "Ocean", colors: ["#0a1628", "#1a2640", "#0ea5e9"] },
    { id: "forest", name: "Forest", colors: ["#0a1a0f", "#1a2e1a", "#22c55e"] },
    { id: "custom", name: "Custom", colors: ["#111", "#222", "#999"] },
] as const;

export const TEMPLATES = [
    { id: "developer", name: "Developer", desc: "Clean & professional" },
    { id: "designer", name: "Designer", desc: "Creative & visual" },
    { id: "minimal", name: "Minimal", desc: "Simple & elegant" },
    { id: "creative", name: "Creative", desc: "Bold & unique" },
    { id: "custom", name: "Custom Code", desc: "Full control" },
] as const;

export const LANGUAGES = [
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

export const LANG_COLORS: Record<string, string> = {
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

export const THEME_STYLES: Record<
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

// Default section display order
export const DEFAULT_SECTION_ORDER = [
    "hero",
    "about",
    "skills",
    "projects",
    "experience",
    "contact",
    "blog",
    "stats",
] as const;

// Section display names
export const SECTION_LABELS: Record<string, string> = {
    hero: "Hero Banner",
    about: "About Me",
    skills: "Skills & Languages",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    blog: "Blog",
    stats: "GitHub Stats",
};

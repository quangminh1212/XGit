import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        user: {
            githubId: number;
            githubUsername: string;
            githubAvatar: string;
            githubBio: string;
            githubName: string;
            githubLocation: string;
            githubBlog: string;
            githubCompany: string;
            githubTwitter: string;
            publicRepos: number;
            followers: number;
            following: number;
        } & DefaultSession["user"];
    }
}

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    fork: boolean;
    archived: boolean;
}

export interface PortfolioConfig {
    username: string;
    theme: "midnight" | "aurora" | "sunset" | "ocean" | "forest" | "custom";
    template: "developer" | "designer" | "minimal" | "creative" | "custom";
    customCSS: string;
    customHTML: string;
    customJS: string;
    sections: {
        hero: boolean;
        about: boolean;
        skills: boolean;
        projects: boolean;
        experience: boolean;
        contact: boolean;
        blog: boolean;
        stats: boolean;
    };
    hero: {
        title: string;
        subtitle: string;
        tagline: string;
        cta: string;
        ctaLink: string;
        backgroundType: "gradient" | "particles" | "waves" | "custom";
    };
    about: {
        bio: string;
        showAvatar: boolean;
        showStats: boolean;
        showLocation: boolean;
        showCompany: boolean;
    };
    projects: {
        featured: string[];
        showAll: boolean;
        maxDisplay: number;
        sortBy: "stars" | "updated" | "created" | "name";
        filterForks: boolean;
        filterArchived: boolean;
    };
    skills: {
        showLanguages: boolean;
        showTopics: boolean;
        customSkills: string[];
    };
    contact: {
        email: string;
        showGithub: boolean;
        showTwitter: boolean;
        showLinkedin: boolean;
        linkedinUrl: string;
        showBlog: boolean;
        customLinks: { label: string; url: string; icon: string }[];
    };
    seo: {
        title: string;
        description: string;
        ogImage: string;
        keywords: string[];
    };
    analytics: {
        googleAnalyticsId: string;
    };
    language: "en" | "vi" | "ja" | "ko" | "zh" | "fr" | "de" | "es" | "pt" | "ru";
    sectionOrder: SectionKey[];
    customDomain: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export type SectionKey = keyof PortfolioConfig["sections"];

export interface LanguageStat {
    name: string;
    percentage: number;
    color: string;
    bytes: number;
}

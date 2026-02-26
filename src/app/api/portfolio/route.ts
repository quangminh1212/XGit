import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { PortfolioConfig } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data", "portfolios");

async function ensureDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch { }
}

function getDefaultConfig(username: string): PortfolioConfig {
    return {
        username,
        theme: "midnight",
        template: "developer",
        customCSS: "",
        customHTML: "",
        customJS: "",
        sections: {
            hero: true,
            about: true,
            skills: true,
            projects: true,
            experience: true,
            contact: true,
            blog: false,
            stats: true,
        },
        hero: {
            title: "",
            subtitle: "",
            tagline: "",
            cta: "View My Work",
            ctaLink: "#projects",
            backgroundType: "gradient",
        },
        about: {
            bio: "",
            showAvatar: true,
            showStats: true,
            showLocation: true,
            showCompany: true,
        },
        projects: {
            featured: [],
            showAll: false,
            maxDisplay: 6,
            sortBy: "stars",
            filterForks: true,
            filterArchived: true,
        },
        skills: {
            showLanguages: true,
            showTopics: true,
            customSkills: [],
        },
        contact: {
            email: "",
            showGithub: true,
            showTwitter: true,
            showLinkedin: false,
            linkedinUrl: "",
            showBlog: true,
            customLinks: [],
        },
        seo: {
            title: "",
            description: "",
            ogImage: "",
            keywords: [],
        },
        analytics: {
            googleAnalyticsId: "",
        },
        language: "en",
        sectionOrder: ["hero", "about", "skills", "projects", "experience", "contact", "blog", "stats"],
        customDomain: "",
        isPublished: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
}

export async function GET() {
    const session = await auth();
    if (!session?.user?.githubUsername) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureDataDir();
    const filePath = path.join(DATA_DIR, `${session.user.githubUsername}.json`);

    try {
        const data = await fs.readFile(filePath, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch {
        const defaultConfig = getDefaultConfig(session.user.githubUsername);
        return NextResponse.json(defaultConfig);
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.githubUsername) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureDataDir();
    const body = await req.json();
    const filePath = path.join(DATA_DIR, `${session.user.githubUsername}.json`);

    const config: PortfolioConfig = {
        ...body,
        username: session.user.githubUsername,
        updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(config, null, 2));
    return NextResponse.json(config);
}

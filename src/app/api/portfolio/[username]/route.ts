import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "portfolios");

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;
    const filePath = path.join(DATA_DIR, `${username}.json`);

    try {
        const data = await fs.readFile(filePath, "utf-8");
        const config = JSON.parse(data);

        if (!config.isPublished) {
            return NextResponse.json(
                { error: "Portfolio not published" },
                { status: 404 }
            );
        }

        return NextResponse.json(config);
    } catch {
        return NextResponse.json(
            { error: "Portfolio not found" },
            { status: 404 }
        );
    }
}

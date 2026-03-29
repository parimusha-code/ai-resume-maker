import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "resumes.json");

function getResumes() {
    if (!fs.existsSync(DATA_PATH)) return [];
    try {
        const data = fs.readFileSync(DATA_PATH, "utf8");
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveResumes(resumes: any[]) {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_PATH, JSON.stringify(resumes, null, 2), "utf8");
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const resumes = getResumes();
        const resume = resumes.find((r: any) => r.id === id);

        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        // Check ownership
        if (resume.userId !== session.user.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json({ resume }, { status: 200 });
    } catch (error: any) {
        console.error("Get Resume Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const resumes = getResumes();
        const index = resumes.findIndex((r: any) => r.id === id);

        if (index === -1) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        // Check ownership
        if (resumes[index].userId !== session.user.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        // Update resume
        resumes[index] = {
            ...resumes[index],
            ...body,
            id: id,
            userId: session.user.email,
            updatedAt: new Date().toISOString()
        };

        saveResumes(resumes);

        return NextResponse.json({ success: true, resume: resumes[index] }, { status: 200 });
    } catch (error: any) {
        console.error("Update Resume Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const resumes = getResumes();
        const index = resumes.findIndex((r: any) => r.id === id);

        if (index === -1) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        // Check ownership
        if (resumes[index].userId !== session.user.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        const newResumes = resumes.filter((r: any) => r.id !== id);
        saveResumes(newResumes);

        return NextResponse.json({ success: true, message: "Resume deleted" }, { status: 200 });
    } catch (error: any) {
        console.error("Delete Resume Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

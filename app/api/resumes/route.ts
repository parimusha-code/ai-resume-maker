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

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;
        const resumes = getResumes();
        const userResumes = resumes.filter((r: any) => r.userId === email);

        return NextResponse.json({ resumes: userResumes }, { status: 200 });
    } catch (error: any) {
        console.error("Get Resumes Error:", error);
        return NextResponse.json(
            { message: error.message || "Internal Server Error" }, 
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const resumes = getResumes();
        
        const newResume = {
            ...body,
            id: String(Date.now()),
            userId: session.user.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        resumes.push(newResume);
        saveResumes(resumes);

        return NextResponse.json({ 
            success: true, 
            message: "Resume saved successfully",
            id: newResume.id,
            resume: newResume
        }, { status: 200 });
    } catch (error: any) {
        console.error("Save Resume Error:", error);
        return NextResponse.json(
            { message: error.message || "Internal Server Error" }, 
            { status: 500 }
        );
    }
}

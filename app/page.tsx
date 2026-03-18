"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">AI Resume Maker</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{session?.user?.email}</span>
            <Link
              href="/api/auth/signout"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Create Your Perfect Resume with AI
          </h2>
          <p className="text-xl text-gray-600">
            Let artificial intelligence help you craft a professional resume that stands out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Create New Resume */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Create New Resume</h3>
            <p className="text-gray-600 mb-6">
              Start from scratch or use a template. Our AI will help you generate compelling content.
            </p>
            <Link
              href="/builder"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Start Building
            </Link>
          </div>

          {/* View Your Resumes */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">My Resumes</h3>
            <p className="text-gray-600 mb-6">
              Access all your previously created resumes. Edit, download, or share them.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">🤖 AI-Powered</h4>
              <p className="text-gray-600">
                Get AI suggestions for resume content, bullet points, and improvements
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">📋 Professional Templates</h4>
              <p className="text-gray-600">
                Choose from industry-standard resume templates
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">📥 Easy Export</h4>
              <p className="text-gray-600">
                Download as PDF or share a public link
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
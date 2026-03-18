"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-indigo-600 mb-6">AI Resume Maker</h1>
        <p className="text-xl text-gray-700 mb-12">
          Create professional resumes with AI assistance. Build, edit, and share your resume in minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/login"
            className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition shadow-lg"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-green-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-green-700 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
            <p className="text-gray-600">OpenAI-powered content generation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2">Fast & Easy</h3>
            <p className="text-gray-600">Build professional resumes in minutes</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">📥</div>
            <h3 className="font-bold text-lg mb-2">Download</h3>
            <p className="text-gray-600">Export and share your resumes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

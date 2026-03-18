"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchResumes();
    }
  }, [status, router]);

  const fetchResumes = async () => {
    try {
      const response = await axios.get("/api/resumes");
      setResumes(response.data.resumes || []);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            AI Resume Maker
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{session?.user?.email}</span>
            <Link href="/builder" className="bg-indigo-600 text-white px-4 py-2 rounded">
              New Resume
            </Link>
            <Link href="/api/auth/signout" className="bg-red-500 text-white px-4 py-2 rounded">
              Sign Out
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Resumes</h1>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 mb-6">You haven't created any resumes yet.</p>
            <Link
              href="/builder"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Create Your First Resume
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume: any) => (
              <div key={resume.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{resume.title}</h3>
                <p className="text-gray-600 mb-4">Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/builder/${resume.id}`}
                    className="flex-1 text-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/api/resumes/${resume.id}/download`}
                    className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Download
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

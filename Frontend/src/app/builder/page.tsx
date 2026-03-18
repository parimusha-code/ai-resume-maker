"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [{ company: "", position: "", description: "", startDate: "", endDate: "" }],
    education: [{ institution: "", degree: "", field: "", graduationDate: "" }],
    skills: [],
    projects: [{ name: "", description: "" }],
  });
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setResumeData({ ...resumeData, [field]: e.target.value });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    arrayName: string,
    index: number,
    field: string
  ) => {
    const newArray = [...(resumeData[arrayName as keyof typeof resumeData] as any[])];
    newArray[index] = { ...newArray[index], [field]: e.target.value };
    setResumeData({ ...resumeData, [arrayName]: newArray });
  };

  const handleGenerateAI = async (field: string, index?: number) => {
    setGenerating(true);
    try {
      const response = await axios.post("/api/generate", {
        resumeData,
        fieldToGenerate: field,
        index,
      });
      alert("AI Generated: " + response.data.generatedText);
    } catch (error) {
      alert("Failed to generate content");
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.post("/api/resumes", resumeData);
      alert("Resume saved successfully!");
      router.push("/dashboard");
    } catch (error) {
      alert("Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Resume Builder</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Resume"}
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resumeData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={resumeData.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
                <button
                  onClick={() => handleGenerateAI("summary")}
                  disabled={generating}
                  className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                >
                  {generating ? "Generating..." : "Generate with AI"}
                </button>
              </div>
              <textarea
                placeholder="Write your professional summary..."
                value={resumeData.summary}
                onChange={(e) => handleInputChange(e, "summary")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 h-24"
              />
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Experience</h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleArrayChange(e, "experience", index, "company")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleArrayChange(e, "experience", index, "position")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                  />
                  <textarea
                    placeholder="Job Description"
                    value={exp.description}
                    onChange={(e) => handleArrayChange(e, "experience", index, "description")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20"
                  />
                  <button
                    onClick={() => handleGenerateAI("experience", index)}
                    disabled={generating}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm mt-3 hover:bg-blue-600 disabled:opacity-50"
                  >
                    Generate Bullet Points
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold text-lg">{resumeData.name || "Your Name"}</p>
                <p className="text-gray-600">{resumeData.email}</p>
                <p className="text-gray-600">{resumeData.phone}</p>
              </div>
              {resumeData.summary && (
                <div>
                  <p className="font-bold">Summary</p>
                  <p className="text-gray-700">{resumeData.summary}</p>
                </div>
              )}
              <div>
                <p className="font-bold">Skills</p>
                <p className="text-gray-700">{resumeData.skills.join(", ") || "Add skills"}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

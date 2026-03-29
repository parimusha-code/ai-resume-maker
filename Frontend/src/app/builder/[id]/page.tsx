"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditBuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [{ company: "", position: "", description: "", startDate: "", endDate: "" }],
    education: [{ institution: "", degree: "", field: "", graduationDate: "" }],
    skills: [] as string[],
    projects: [{ name: "", description: "" }],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && id) {
      fetchResume();
    }
  }, [status, router, id]);

  const fetchResume = async () => {
    try {
      const response = await axios.get(`/api/resumes/${id}`);
      if (response.data.resume) {
        setResumeData(response.data.resume);
      }
    } catch (error) {
      console.error("Failed to fetch resume:", error);
      alert("Failed to load resume data");
    } finally {
      setLoading(false);
    }
  };

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
      await axios.put(`/api/resumes/${id}`, resumeData);
      alert("Resume updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      alert("Failed to update resume");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading Resume...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
               ← Back
            </button>
            <h1 className="text-2xl font-bold text-indigo-600">Edit Resume</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Resume"}
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
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

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
                <button
                  onClick={() => {
                    const newExp = [...resumeData.experience, { company: "", position: "", description: "", startDate: "", endDate: "" }];
                    setResumeData({ ...resumeData, experience: newExp });
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                >
                  + Add Experience
                </button>
              </div>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-b-0 relative group">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleArrayChange(e, "experience", index, "company")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => handleArrayChange(e, "experience", index, "position")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <textarea
                    placeholder="Job Description"
                    value={exp.description}
                    onChange={(e) => handleArrayChange(e, "experience", index, "description")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 mb-3"
                  />
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
               <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
               <textarea
                placeholder="List your skills..."
                value={resumeData.skills.join(", ")}
                onChange={(e) => {
                  const skills = e.target.value.split(",").map(s => s.trim());
                  setResumeData({ ...resumeData, skills });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-2xl border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Preview</h3>
                <div className="border-b pb-4 mb-4">
                    <h1 className="text-2xl font-black text-gray-900">{resumeData.name || "YOUR NAME"}</h1>
                    <p className="text-sm text-gray-600">{resumeData.email}</p>
                </div>
                <section className="mb-4">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Summary</h4>
                    <p className="text-xs text-gray-700 italic">{resumeData.summary}</p>
                </section>
                <section>
                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Experience</h4>
                    {resumeData.experience.slice(0, 2).map((exp, i) => (
                        <div key={i} className="mb-2">
                            <h5 className="text-xs font-bold">{exp.position}</h5>
                            <p className="text-[10px] text-gray-500">{exp.company}</p>
                        </div>
                    ))}
                </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

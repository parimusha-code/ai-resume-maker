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
    skills: [] as string[],
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
                  {resumeData.experience.length > 1 && (
                    <button
                      onClick={() => {
                        const newExp = resumeData.experience.filter((_, i) => i !== index);
                        setResumeData({ ...resumeData, experience: newExp });
                      }}
                      className="absolute -right-2 -top-2 bg-red-100 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  )}
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
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <input
                      type="text"
                      placeholder="Start Date (e.g. 2023-01)"
                      value={exp.startDate}
                      onChange={(e) => handleArrayChange(e, "experience", index, "startDate")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="End Date (e.g. Present)"
                      value={exp.endDate}
                      onChange={(e) => handleArrayChange(e, "experience", index, "endDate")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <textarea
                    placeholder="Job Description"
                    value={exp.description}
                    onChange={(e) => handleArrayChange(e, "experience", index, "description")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 mb-3"
                  />
                  <button
                    onClick={() => handleGenerateAI("experience", index)}
                    disabled={generating}
                    className="bg-blue-500 text-white px-4 py-1 rounded text-xs hover:bg-blue-600 disabled:opacity-50"
                  >
                    {generating ? "Generating..." : "AI Refine Points"}
                  </button>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                <button
                  onClick={() => {
                    const newEdu = [...resumeData.education, { institution: "", degree: "", field: "", graduationDate: "" }];
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                >
                  + Add Education
                </button>
              </div>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-b-0 relative group">
                  {resumeData.education.length > 1 && (
                    <button
                      onClick={() => {
                        const newEdu = resumeData.education.filter((_, i) => i !== index);
                        setResumeData({ ...resumeData, education: newEdu });
                      }}
                      className="absolute -right-2 -top-2 bg-red-100 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  )}
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleArrayChange(e, "education", index, "institution")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                  />
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleArrayChange(e, "education", index, "degree")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Graduation Year"
                      value={edu.graduationDate}
                      onChange={(e) => handleArrayChange(e, "education", index, "graduationDate")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
              <div className="p-4 bg-indigo-50 rounded-lg mb-4">
                <p className="text-sm text-indigo-700 font-medium">
                  Tip: Separate skills with commas (e.g., React, Node.js, Python)
                </p>
              </div>
              <textarea
                placeholder="List your skills..."
                value={resumeData.skills.join(", ")}
                onChange={(e) => {
                  const skills = e.target.value.split(",").map(s => s.trim());
                  setResumeData({ ...resumeData, skills });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 h-24"
              />
            </div>
          </div>

          {/* Premium Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 h-2 w-full"></div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Premium Preview</h3>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">Draft</span>
                </div>
                
                <div className="space-y-6 text-gray-800">
                  {/* Header */}
                  <div className="border-b pb-4">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                      {resumeData.name?.toUpperCase() || "YOUR NAME"}
                    </h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 font-medium">
                      <span>{resumeData.email}</span>
                      {resumeData.phone && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span>{resumeData.phone}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {resumeData.summary && (
                    <section>
                      <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Professional Summary</h4>
                      <p className="text-sm leading-relaxed text-gray-700 italic">
                        "{resumeData.summary}"
                      </p>
                    </section>
                  )}

                  {/* Skills */}
                  {resumeData.skills.length > 0 && (
                    <section>
                      <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Core Competencies</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-[10px] font-bold rounded uppercase tracking-tighter">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Experience */}
                  <section>
                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Work History</h4>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp: any, i: number) => (
                        <div key={i} className="relative pl-4 border-l-2 border-gray-100">
                          <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-600"></div>
                          <h5 className="text-sm font-bold text-gray-900">{exp.position || "Position Title"}</h5>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold text-gray-600">{exp.company || "Company Name"}</span>
                            <span className="text-[10px] text-gray-400 font-bold">{exp.startDate || "Date"} — {exp.endDate || "Present"}</span>
                          </div>
                          <p className="text-[11px] leading-snug text-gray-600 mt-1 line-clamp-3">
                            {exp.description || "Describe your key achievements and responsibilities..."}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <button className="w-full mt-8 py-3 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-black transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

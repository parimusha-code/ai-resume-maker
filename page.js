"use client";

import React from "react";

export default function ResumePage() {
  const resumeData = {
    name: "Parim Usha",
    email: "parimusha2005@gmail.com",
    phone: "9141122498",
    summary: "Detail-oriented Computer Science graduate with a strong foundation in full-stack development, AI integration, and software engineering. Proven ability to build and deploy scalable web applications using React, Next.js, and Node.js. Passionate about leveraging cutting-edge technology to solve complex problems and deliver high-impact user experiences.",
    experience: [
      {
        company: "AI Tech Solutions",
        position: "Full Stack Developer Intern",
        description: "Developed and integrated AI-powered features for a suite of career tools. Optimized frontend performance and implemented responsive designs using Tailwind CSS and Next.js.",
        startDate: "2023-06",
        endDate: "2023-12"
      }
    ],
    education: [
      {
        institution: "Global Institute of Technology",
        degree: "Bachelor of Technology",
        field: "Computer Science & Engineering",
        graduationDate: "2024"
      }
    ],
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "OpenAI API", "PostgreSQL", "Git"],
    projects: [
      {
        name: "AI Resume Maker",
        description: "A full-stack application that leverages AI to help users build professional resumes with automated content generation."
      },
      {
        name: "YouTube Summarizer",
        description: "An AI tool that generates concise summaries of YouTube videos by analyzing transcripts."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        {/* Top Accent Bar */}
        <div className="h-3 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600"></div>

        <div className="p-8 sm:p-12">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-slate-100 pb-10">
            <div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-3">
                {resumeData.name.toUpperCase()}
              </h1>
              <p className="text-xl font-medium text-slate-500 tracking-tight">
                Computer Science Graduate & Full Stack Developer
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 text-slate-600">
              <a href={`mailto:${resumeData.email}`} className="hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {resumeData.email}
              </a>
              <span className="flex items-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                {resumeData.phone}
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Summary */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">About Me</h2>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 italic border-l-4 border-indigo-100 pl-6 py-2">
                  "{resumeData.summary}"
                </p>
              </section>

              {/* Experience */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Experience</h2>
                </div>
                <div className="space-y-8">
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="group relative">
                      <div className="absolute -left-[33px] top-2 w-[11px] h-[11px] rounded-full bg-white border-2 border-indigo-600 z-10"></div>
                      <div className="absolute -left-[28px] top-5 w-[1px] h-full bg-slate-100 group-last:hidden"></div>
                      <div className="mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                        <div className="flex justify-between items-center text-indigo-600 font-bold text-sm">
                          <span>{exp.company.toUpperCase()}</span>
                          <span className="text-slate-400 font-medium">{exp.startDate} — {exp.endDate}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-medium">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4m-12 0l4 4M12 4l-4 4"></path></svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Featured Projects</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resumeData.projects.map((project, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 group">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-12">
              {/* Skills */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Tech Stack</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-full shadow-sm hover:border-indigo-400 hover:text-indigo-600 cursor-default transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Education</h2>
                </div>
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{edu.institution}</h3>
                    <p className="text-indigo-600 font-bold text-sm tracking-tight">{edu.degree}</p>
                    <p className="text-slate-500 text-xs font-bold">{edu.field}</p>
                    <p className="text-slate-400 text-xs font-medium">{edu.graduationDate}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>

          {/* Footer Action */}
          <footer className="mt-16 pt-10 border-t border-slate-100 flex justify-center">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all transform hover:-translate-y-1 shadow-xl flex items-center gap-3 group">
              <span>Export Premium PDF</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </footer>
        </div>
      </div>
      <p className="text-center mt-12 text-slate-400 text-sm font-medium uppercase tracking-[0.2em]">
        Generated by AI Resume Maker
      </p>
    </div>
  );
}

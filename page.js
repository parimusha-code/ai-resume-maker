"use client";
import { useState } from "react";

export default function ResumeBuilder() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [showResume, setShowResume] = useState(false);

  const handleReset = () => {
    setName("");
    setSkills("");
    setEducation("");
    setShowResume(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Resume Builder</h1>

      {!showResume && (
        <div>
          <input
            style={{ width: "300px", padding: "8px" }}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />

          <input
            style={{ width: "300px", padding: "8px" }}
            placeholder="Enter your skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <br /><br />

          <input
            style={{ width: "300px", padding: "8px" }}
            placeholder="Enter your education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
          <br /><br />

          <button
            style={{ padding: "10px 20px", cursor: "pointer" }}
            onClick={() => setShowResume(true)}
          >
            Generate Resume
          </button>
        </div>
      )}

      {showResume && (
        <div
          style={{
            border: "2px solid black",
            padding: "20px",
            marginTop: "30px",
            width: "500px",
          }}
        >
          <h2>{name}</h2>

          <h3>Education</h3>
          <p>{education}</p>

          <h3>Skills</h3>
          <ul>
            {skills.split(",").map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>

          <button
            style={{ padding: "8px 15px", marginTop: "20px", cursor: "pointer" }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
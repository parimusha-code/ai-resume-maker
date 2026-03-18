import React, { useState } from "react";
import axios from "axios";

interface FormData {
  name: string;
  experience: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    experience: "",
  });

  const [aiSummary, setAiSummary] = useState<string>("");

  const generateAIContent = async (): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:5000/generate", formData);
      setAiSummary(response.data.summary);
    } catch (error) {
      console.error("Error generating AI content:", error);
    }
  };

  return React.createElement(
    "div",
    { style: { padding: "20px" } },
    React.createElement("h1", null, "AI Resume Builder"),

    React.createElement("input", {
      type: "text",
      placeholder: "Full Name",
      onChange: (e: any) =>
        setFormData({ ...formData, name: e.target.value }),
    }),

    React.createElement("br"),
    React.createElement("br"),

    React.createElement("textarea", {
      placeholder: "Brief Experience",
      onChange: (e: any) =>
        setFormData({ ...formData, experience: e.target.value }),
    }),

    React.createElement("br"),
    React.createElement("br"),

    React.createElement(
      "button",
      { onClick: generateAIContent },
      "Generate AI Summary"
    ),

    React.createElement(
      "div",
      null,
      React.createElement("h3", null, "Preview"),
      React.createElement(
        "p",
        null,
        React.createElement("strong", null, "Name: "),
        formData.name
      ),
      React.createElement(
        "p",
        null,
        React.createElement("strong", null, "AI Summary: "),
        aiSummary
      )
    )
  );
}

export default App;
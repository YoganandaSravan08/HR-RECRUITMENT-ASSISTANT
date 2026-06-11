const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateATSAnalysis = async (resumeText, jobDescription) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: "You are an expert ATS recruitment assistant.",
      },
      {
        role: "user",
        content: `
Analyze the resume against the job description.

Return ONLY valid JSON.

{
  "atsScore": "number between 0 and 100",
  "matchedSkills": [],
  "missingSkills": [],
  "recommendation": ""
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`,
      },
    ],

    temperature: 0.2,
  });

  return completion.choices[0].message.content;
};
const generateInterviewQuestions = async (role) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: "You are an expert technical interviewer.",
      },
      {
        role: "user",
        content: `
Generate interview questions for ${role}.

Return ONLY valid JSON.

{
  "technicalQuestions": [],
  "hrQuestions": [],
  "scenarioQuestions": []
}
`,
      },
    ],

    temperature: 0.4,
  });

  return completion.choices[0].message.content;
};
const generateEmail = async (emailType, candidateName, role) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: "You are an expert HR recruiter.",
      },
      {
        role: "user",
        content: `
Generate a professional ${emailType} email.

Candidate Name:
${candidateName}

Role:
${role}

Return only the email content.
`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = {
  generateATSAnalysis,
  generateInterviewQuestions,
  generateEmail,
};


const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ===============================
// Generate Quiz
// ===============================
const generateQuiz = async (
  topic,
  difficulty,
  numberOfQuestions
) => {
  const prompt = `
Generate ${numberOfQuestions} multiple choice questions on ${topic}.

Difficulty: ${difficulty}

Return ONLY valid JSON.

Format:

[
  {
    "question": "",
    "options": ["", "", "", ""],
    "answer": "",
    "explanation": ""
  }
]
`;

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

  return completion.choices[0].message.content;
};

// ===============================
// Summarize Notes
// ===============================
const summarizeNote = async (content) => {
  const prompt = `
Summarize the following study notes.

Return:
- Key Points
- Important Concepts
- Short Revision Notes

Notes:
${content}
`;

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    });

  return completion.choices[0].message.content;
};

module.exports = {
  generateQuiz,
  summarizeNote,
};


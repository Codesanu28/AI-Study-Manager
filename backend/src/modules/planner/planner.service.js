const plannerRepository =
  require("./planner.repository");

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const createPlan = async (
  userId,
  data
) => {
  return await plannerRepository.createPlan({
    ...data,
    user: userId,
  });
};

const getPlans = async (userId) => {
  return await plannerRepository.getPlansByUser(
    userId
  );
};

const updatePlan = async (
  planId,
  userId,
  data
) => {
  const plan =
    await plannerRepository.getPlanById(
      planId
    );

  if (!plan) {
    throw new Error("Plan not found");
  }

  if (
    plan.user.toString() !== userId
  ) {
    throw new Error("Unauthorized");
  }

  return await plannerRepository.updatePlan(
    planId,
    data
  );
};

const deletePlan = async (
  planId,
  userId
) => {
  const plan =
    await plannerRepository.getPlanById(
      planId
    );

  if (!plan) {
    throw new Error("Plan not found");
  }

  if (
    plan.user.toString() !== userId
  ) {
    throw new Error("Unauthorized");
  }

  return await plannerRepository.deletePlan(
    planId
  );
};

const generateAIPlan = async (
  goal,
  hoursPerDay,
  level,
  targetDate
) => {
  const prompt = `
Create a personalized study roadmap.

Goal: ${goal}

Hours Per Day: ${hoursPerDay}

Current Level: ${level}

Target Date: ${targetDate}

Generate:

1. Weekly roadmap
2. Daily tasks
3. Revision schedule
4. Milestones

Format clearly using headings and bullet points.
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
      temperature: 0.5,
    });

  return completion.choices[0]
    .message.content;
};

module.exports = {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
  generateAIPlan,
};
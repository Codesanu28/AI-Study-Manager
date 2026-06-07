const plannerRepository =
  require("./planner.repository");

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

module.exports = {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
};
const plannerService =
  require("./planner.service");

const createPlan = async (
  req,
  res
) => {
  try {
    const plan =
      await plannerService.createPlan(
        req.user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getPlans = async (
  req,
  res
) => {
  try {
    const plans =
      await plannerService.getPlans(
        req.user.id
      );

    res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePlan = async (
  req,
  res
) => {
  try {
    const plan =
      await plannerService.updatePlan(
        req.params.id,
        req.user.id,
        req.body
      );

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePlan = async (
  req,
  res
) => {
  try {
    await plannerService.deletePlan(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message:
        "Plan deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAnalytics = async (
  req,
  res
) => {
  try {
    const plans =
      await plannerService.getPlans(
        req.user.id
      );

    const analytics = {
      totalPlans: plans.length,

      completedPlans:
        plans.filter(
          (p) =>
            p.status === "Completed"
        ).length,

      pendingPlans:
        plans.filter(
          (p) =>
            p.status === "Pending"
        ).length,

      inProgressPlans:
        plans.filter(
          (p) =>
            p.status === "In Progress"
        ).length,
    };

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const generateAIPlan = async (
  req,
  res
) => {
  try {
    const {
      goal,
      hoursPerDay,
      level,
      targetDate,
    } = req.body;

    const plan =
      await plannerService.generateAIPlan(
        goal,
        hoursPerDay,
        level,
        targetDate
      );

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const generateMentorPlan = async (
  req,
  res
) => {
  try {
    const { prompt } =
      req.body;

    const plan =
      await plannerService.generateMentorPlan(
        prompt
      );

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};
module.exports = {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
  getAnalytics,
  generateAIPlan,
  generateMentorPlan,
};
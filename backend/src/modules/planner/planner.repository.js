const Planner =
  require("./planner.model");

const createPlan = async (data) => {
  return await Planner.create(data);
};

const getPlansByUser = async (
  userId
) => {
  return await Planner.find({
    user: userId,
  }).sort({ createdAt: -1 });
};

const getPlanById = async (id) => {
  return await Planner.findById(id);
};

const updatePlan = async (
  id,
  data
) => {
  return await Planner.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

const deletePlan = async (id) => {
  return await Planner.findByIdAndDelete(
    id
  );
};

module.exports = {
  createPlan,
  getPlansByUser,
  getPlanById,
  updatePlan,
  deletePlan,
};
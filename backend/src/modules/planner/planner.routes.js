const express = require("express");

const protect =
  require("../../middleware/auth.middleware");

const plannerController =
  require("./planner.controller");

const router = express.Router();

/*
 * Analytics Route
 * Must come before "/:id"
 */
router.get(
  "/analytics",
  protect,
  plannerController.getAnalytics
);

/*
 * Create Plan
 */
router.post(
  "/",
  protect,
  plannerController.createPlan
);

/*
 * Get All Plans
 */
router.get(
  "/",
  protect,
  plannerController.getPlans
);

/*
 * Update Plan
 */
router.put(
  "/:id",
  protect,
  plannerController.updatePlan
);

/*
 * Delete Plan
 */
router.delete(
  "/:id",
  protect,
  plannerController.deletePlan
);

module.exports = router;
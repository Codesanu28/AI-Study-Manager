const getDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dashboard fetched successfully",
    user: req.user,
  });
};

module.exports = {
  getDashboard,
};
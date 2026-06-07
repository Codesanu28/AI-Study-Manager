const summarizerService =
  require("./summarizer.service");

const summarizeNote = async (
  req,
  res
) => {
  try {
    const { note } = req.body;

    const summary =
      await summarizerService.summarizeNote(
        note
      );

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  summarizeNote,
};
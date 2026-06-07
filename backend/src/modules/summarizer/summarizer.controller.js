const summarizerService =
  require("./summarizer.service");

const summarizeNote = async (
  req,
  res
) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const summary =
      await summarizerService.summarizeNote(
        text
      );

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  summarizeNote,
};
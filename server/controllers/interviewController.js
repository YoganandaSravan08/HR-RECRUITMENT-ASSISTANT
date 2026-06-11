const {
  generateInterviewQuestions,
} = require(
  "../services/groqService"
);

exports.generateQuestions =
  async (req, res) => {
    try {
      const { role } = req.body;

      const response =
        await generateInterviewQuestions(
          role
        );

      const cleanedResponse =
        response
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const parsed =
        JSON.parse(cleanedResponse);

      res.json(parsed);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };
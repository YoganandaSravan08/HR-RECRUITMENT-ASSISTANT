const {
  generateEmail
} = require("../services/groqService");

exports.createEmail =
  async (req, res) => {
    try {

      const {
        emailType,
        candidateName,
        role
      } = req.body;

      const email =
        await generateEmail(
          emailType,
          candidateName,
          role
        );

      res.json({
        email
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };
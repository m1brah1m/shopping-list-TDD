const accountController = (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Authorized",
      profile: {
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

module.exports = { accountController };

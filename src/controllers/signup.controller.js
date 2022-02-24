exports.signUp = async (req, res, next) => {
  try {
    res.status(201).json({ message: "Account created" });
  } catch (error) {}
};

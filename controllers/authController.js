const login = (req, res) => {
  try {
    const { username, password } = req.body;
    // Dummy authentication logic
    if (username === "admin" && password === "password") {
      res.status(200).json({
        success: true,
        message: "Login successfully!",
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing hello request",
      error: error.message,
    });
  }
};

module.exports = {
  login,
};  
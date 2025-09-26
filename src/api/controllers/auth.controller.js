const authService = require("../../services/auth.service");

const registerController = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);
    res.status(201).json({
      message: "Registrasi berhasil",
      data: newUser,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Username sudah digunakan" });
    }
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(200).json({
      message: "Login berhasil",
      data: result,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { registerController, loginController };

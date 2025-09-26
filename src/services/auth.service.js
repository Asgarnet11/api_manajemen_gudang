const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Mendaftarkan pengguna baru
 * @param {object} userData
 * @returns {object}
 */
const register = async (userData) => {
  // Enkripsi password sebelum disimpan
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await prisma.user.create({
    data: {
      nama: userData.nama,
      username: userData.username,
      password: hashedPassword,
      role: userData.role || "staff",
    },
  });

  delete newUser.password;
  return newUser;
};

/**
 * Memproses login pengguna
 * @param {string} username
 * @param {string} password
 * @returns {object}
 */
const login = async (username, password) => {
  // 1. Cari pengguna berdasarkan username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("Username atau password salah");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Username atau password salah");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  delete user.password;

  return { user, token };
};

module.exports = { register, login };

const getMyProfile = (req, res) => {
  res.status(200).json({
    message: "Profil berhasil diambil",
    data: req.user,
  });
};

module.exports = { getMyProfile };

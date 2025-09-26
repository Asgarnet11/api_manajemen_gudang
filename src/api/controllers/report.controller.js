const reportService = require("../../services/report.service");

const getItemReport = async (req, res) => {
  try {
    const filters = req.query;
    const report = await reportService.generateItemReport(filters);
    res.status(200).json({
      message: "Laporan berhasil dibuat",
      data: report,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal membuat laporan", error: error.message });
  }
};

module.exports = {
  getItemReport,
};

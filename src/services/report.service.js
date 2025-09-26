const prisma = require("../config/prisma");

/**
 * @param {object} filters
 * @returns {Array}
 */
const generateItemReport = async (filters) => {
  const { startDate, endDate, status } = filters;

  const whereClause = {};

  if (status) {
    whereClause.status = status;
  }

  if (startDate && endDate) {
    whereClause.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  const reportData = await prisma.item.findMany({
    where: whereClause,
    include: {
      customer: {
        select: {
          nama: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reportData;
};

module.exports = {
  generateItemReport,
};

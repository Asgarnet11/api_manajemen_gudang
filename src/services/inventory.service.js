const prisma = require("../config/prisma");

/**
 * Mencatat barang masuk baru ke dalam sistem.
 * Menggunakan Prisma Transaction untuk memastikan kedua operasi (membuat item & movement) berhasil atau gagal bersamaan.
 * @param {object} data
 * @param {string} userId
 * @returns {object}
 */
const recordStockIn = async (data, userId) => {
  const { customerId, nama_barang, jumlah, sku, barcode, minimum_stock_level } =
    data;

  if (jumlah <= 0) {
    throw new Error("Jumlah barang masuk harus lebih dari 0.");
  }

  return prisma.$transaction(async (tx) => {
    const item = await tx.item.upsert({
      where: { sku: sku || `__NO_SKU_${Date.now()}__` },
      update: {
        jumlah: {
          increment: jumlah,
        },
      },
      create: {
        nama_barang,
        sku,
        barcode,
        jumlah,
        minimum_stock_level,
        customer: { connect: { id: customerId } },
      },
    });
    await tx.itemMovement.create({
      data: {
        quantityChange: jumlah,
        type: "IN",
        notes: "Barang masuk pertama kali",
        itemId: item.id,
        userId: userId,
      },
    });

    return item;
  });
};

const getItemHistory = async (itemId) => {
  return prisma.itemMovement.findMany({
    where: { itemId },
    include: {
      user: { select: { nama: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getLowStockItems = async () => {
  return prisma.$queryRaw`
    SELECT id, nama_barang, sku, jumlah, minimum_stock_level
    FROM "items"
    WHERE "jumlah" <= "minimum_stock_level" AND "minimum_stock_level" > 0
    ORDER BY "jumlah" ASC;
  `;
};

const getDashboardAnalytics = async () => {
  const [totalCustomers, totalItems, itemStatusCounts] =
    await prisma.$transaction([
      prisma.customer.count(),
      prisma.item.count(),
      prisma.item.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),
    ]);

  const statuses = itemStatusCounts.reduce((acc, current) => {
    acc[current.status] = current._count.status;
    return acc;
  }, {});

  return {
    totalCustomers,
    totalItems,
    statuses,
  };
};

module.exports = {
  recordStockIn,
  getItemHistory,
  getLowStockItems,
  getDashboardAnalytics,
};

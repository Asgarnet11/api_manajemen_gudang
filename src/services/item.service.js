const prisma = require("../config/prisma");

const createItem = async (itemData) => {
  return await prisma.item.create({
    data: itemData,
  });
};

const getAllItems = async (filters) => {
  const { search, status } = filters;

  const where = {};
  if (search) {
    where.nama_barang = { contains: search, mode: "insensitive" };
  }
  if (status) {
    where.status = status;
  }

  return await prisma.item.findMany({
    where,
    include: {
      customer: {
        select: { id: true, nama: true, telepon: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getItemById = async (id) => {
  return await prisma.item.findUnique({
    where: { id },
    include: { customer: true },
  });
};

const updateItemStatus = async (id, status) => {
  const itemData = { status };
  if (status === "keluar_gudang" || status === "dalam_kontainer") {
    itemData.tanggal_keluar = new Date();
  }

  return await prisma.item.update({
    where: { id },
    data: itemData,
  });
};

const deleteItemById = async (id) => {
  return await prisma.item.delete({
    where: { id },
  });
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItemStatus,
  deleteItemById,
};

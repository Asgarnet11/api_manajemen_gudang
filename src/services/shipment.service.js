const prisma = require("../config/prisma");

const createShipment = async (data) => {
  data.etd = new Date(data.etd);
  data.eta = new Date(data.eta);
  return prisma.shipment.create({ data });
};

const getAllShipments = async () => {
  return prisma.shipment.findMany({
    orderBy: { etd: "desc" },
    include: {
      _count: {
        select: { items: true },
      },
    },
  });
};

const getShipmentById = async (id) => {
  return prisma.shipment.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          customer: { select: { nama: true } },
        },
      },
    },
  });
};

const getAvailableItemsForShipment = async () => {
  return prisma.item.findMany({
    where: {
      status: "masuk_gudang",
      shipmentId: null,
    },
    include: {
      customer: { select: { nama: true } },
    },
  });
};

const addItemsToShipment = async (shipmentId, itemIds) => {
  return prisma.item.updateMany({
    where: {
      id: { in: itemIds },
    },
    data: {
      shipmentId: shipmentId,
      status: "dalam_kontainer",
    },
  });
};

module.exports = {
  createShipment,
  getAllShipments,
  getShipmentById,
  getAvailableItemsForShipment,
  addItemsToShipment,
};

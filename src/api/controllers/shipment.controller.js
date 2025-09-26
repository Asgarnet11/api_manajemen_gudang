const shipmentService = require("../../services/shipment.service");

const create = async (req, res) => {
  try {
    const shipment = await shipmentService.createShipment(req.body);
    res
      .status(201)
      .json({ message: "Pengiriman berhasil dibuat", data: shipment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const shipments = await shipmentService.getAllShipments();
    res.status(200).json({ data: shipments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const shipment = await shipmentService.getShipmentById(req.params.id);
    if (!shipment)
      return res.status(404).json({ message: "Pengiriman tidak ditemukan" });
    res.status(200).json({ data: shipment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAvailableItems = async (req, res) => {
  try {
    const items = await shipmentService.getAvailableItemsForShipment();
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItems = async (req, res) => {
  try {
    const { itemIds } = req.body;
    if (!itemIds || itemIds.length === 0) {
      return res.status(400).json({ message: "Daftar item ID diperlukan" });
    }
    await shipmentService.addItemsToShipment(req.params.id, itemIds);
    res
      .status(200)
      .json({ message: "Barang berhasil ditambahkan ke pengiriman" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, getAll, getById, getAvailableItems, addItems };

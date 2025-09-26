const inventoryService = require("../../services/inventory.service");

const createStockIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const newItem = await inventoryService.recordStockIn(req.body, userId);
    res
      .status(201)
      .json({ message: "Barang masuk berhasil dicatat", data: newItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getItemHistory = async (req, res) => {
  try {
    const history = await inventoryService.getItemHistory(req.params.itemId);
    res.status(200).json({ data: history });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLowStock = async (req, res) => {
  try {
    const items = await inventoryService.getLowStockItems();
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const data = await inventoryService.getDashboardAnalytics();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createStockIn, getItemHistory, getLowStock, getAnalytics };

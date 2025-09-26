const itemService = require("../../services/item.service");

const createItem = async (req, res) => {
  try {
    const item = await itemService.createItem(req.body);
    res
      .status(201)
      .json({ message: "Barang berhasil ditambahkan", data: item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems(req.query);
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status diperlukan" });

    const item = await itemService.updateItemStatus(req.params.id, status);
    res
      .status(200)
      .json({ message: "Status barang berhasil diperbarui", data: item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createItem, getAllItems, updateItemStatus };

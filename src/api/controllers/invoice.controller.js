const invoiceService = require("../../services/invoice.service");

const create = async (req, res) => {
  try {
    const { shipmentId, dueDate } = req.body;
    const invoice = await invoiceService.createInvoiceFromShipment(shipmentId, {
      dueDate,
    });
    res.status(201).json({ message: "Faktur berhasil dibuat", data: invoice });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json({ data: invoices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, getAll };

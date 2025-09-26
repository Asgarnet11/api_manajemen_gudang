const customerService = require("../../services/customer.service");

const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res
      .status(201)
      .json({ message: "Pelanggan berhasil ditambahkan", data: customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const { search } = req.query;
    const customers = await customerService.getAllCustomers(search);
    res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    res.status(200).json({ data: customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomerById(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json({ message: "Data pelanggan berhasil diperbarui", data: customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await customerService.deleteCustomerById(req.params.id);
    res.status(200).json({ message: "Pelanggan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

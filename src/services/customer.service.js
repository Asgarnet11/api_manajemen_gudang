const prisma = require("../config/prisma");

const createCustomer = async (customerData) => {
  return await prisma.customer.create({
    data: customerData,
  });
};

const getAllCustomers = async (searchTerm) => {
  const whereCondition = searchTerm
    ? {
        OR: [
          { nama: { contains: searchTerm, mode: "insensitive" } },
          { telepon: { contains: searchTerm, mode: "insensitive" } },
        ],
      }
    : {};

  return await prisma.customer.findMany({
    where: whereCondition,
    orderBy: { nama: "asc" },
  });
};

const getCustomerById = async (id) => {
  return await prisma.customer.findUnique({
    where: { id },
  });
};

const updateCustomerById = async (id, customerData) => {
  return await prisma.customer.update({
    where: { id },
    data: customerData,
  });
};

const deleteCustomerById = async (id) => {
  return await prisma.customer.delete({
    where: { id },
  });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};

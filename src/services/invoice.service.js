const prisma = require("../config/prisma");

/**
 * Membuat draf faktur baru dari sebuah pengiriman.
 * @param {string} shipmentId
 * @param {object} invoiceData
 * @returns {object}
 */
const createInvoiceFromShipment = async (shipmentId, invoiceData) => {
  return prisma.$transaction(async (tx) => {
    const shipment = await tx.shipment.findUnique({
      where: { id: shipmentId },
      include: {
        items: true,
        invoice: true,
        _count: { select: { items: true } },
      },
    });

    if (!shipment) throw new Error("Pengiriman tidak ditemukan.");
    if (shipment.invoice)
      throw new Error("Faktur untuk pengiriman ini sudah ada.");

    if (shipment.items.length === 0) {
      throw new Error(
        "Tidak bisa membuat faktur untuk pengiriman tanpa barang."
      );
    }
    const customerId = shipment.items[0].customerId;
    if (!customerId) {
      throw new Error(
        "Gagal menemukan ID pelanggan dari barang di dalam pengiriman."
      );
    }

    const shippingCostPerItem = 50000;
    const totalAmount = shipment._count.items * shippingCostPerItem;

    const newInvoice = await tx.invoice.create({
      data: {
        dueDate: new Date(invoiceData.dueDate),
        totalAmount: totalAmount,
        customerId: customerId,
        shipmentId: shipment.id,
        status: "DRAFT",
        items: {
          create: [
            {
              description: `Jasa Pengiriman Kargo (No. ${shipment.trackingNumber})`,
              quantity: shipment._count.items,
              unitPrice: shippingCostPerItem,
              totalPrice: totalAmount,
            },
          ],
        },
      },
    });

    return newInvoice;
  });
};
const getAllInvoices = async () => {
  return prisma.invoice.findMany({
    include: { customer: { select: { nama: true } } },
    orderBy: { issueDate: "desc" },
  });
};

module.exports = { createInvoiceFromShipment, getAllInvoices };

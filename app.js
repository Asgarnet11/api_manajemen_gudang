const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const Server = require("socket.io");

const authRoutes = require("./src/api/routes/auth.routes");
const userRoutes = require("./src/api/routes/user.routes");
const customerRoutes = require("./src/api/routes/customer.routes");
const itemRoutes = require("./src/api/routes/item.routes");
const reportRoutes = require("./src/api/routes/report.routes");
const inventoryRoutes = require("./src/api/routes/inventory.routes");
const shipmentRoutes = require("./src/api/routes/shipment.routes");
const invoiceRoutes = require("./src/api/routes/invoice.routes");

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Server for Ekspedisi & Gudang is running with Prisma!",
  });
});

io.on("connection", (socket) => {
  console.log("🔌 Seorang pengguna terhubung:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔌 Seorang pengguna terputus:", socket.id);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/invoices", invoiceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

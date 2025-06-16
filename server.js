const express = require("express");
const http = require("http");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // set your frontend origin in production
    methods: ["GET", "POST"]
  }
});

const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// API: get all parking data
app.get("/api/parking", async (req, res) => {
  const spots = await prisma.parkingSpot.findMany();
  res.json(spots);
});

// API: update parking vacancy via REST (optional)
app.put("/api/parking/:id", async (req, res) => {
  const { id } = req.params;
  const { vacant } = req.body;
  const updated = await prisma.parkingSpot.update({
    where: { id: Number(id) },
    data: { vacant: Number(vacant) },
  });

  // Notify all clients about the update
  io.emit("vacancy_updated", updated);

  res.json(updated);
});

// Realtime WebSocket handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // When a client sends an update
  socket.on("update_vacant", async (data) => {
    const { id, vacant } = data;
    const updated = await prisma.parkingSpot.update({
      where: { id: Number(id) },
      data: { vacant: Number(vacant) }
    });

    // Broadcast to all other clients
    io.emit("vacancy_updated", updated);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚗 Server listening on port ${PORT}`);
});

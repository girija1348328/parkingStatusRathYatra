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

// Create a new Conjestion record
app.post('/api/conjestion', async (req, res) => {
  const {
    checkPointName,
    inFlow,
    outFlow,
    netFlow,
    thresold,
    colorCode,
    status
  } = req.body;

  try {
    const result = await prisma.conjestion.create({
      data: {
        checkPointName,
        inFlow,
        outFlow,
        netFlow,
        thresold,
        colorCode,
        status
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all records
app.get('/api/conjestion', async (req, res) => {
  const records = await prisma.conjestion.findMany();
  res.json(records);
});

// Get one record by ID
app.get('/api/conjestion/:id', async (req, res) => {
  const { id } = req.params;
  const record = await prisma.conjestion.findUnique({ where: { id: parseInt(id) } });
  if (!record) return res.status(404).json({ error: 'Not found' });
  res.json(record);
});

// Update a record
app.put('/api/conjestion/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await prisma.conjestion.update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a record
app.delete('/api/conjestion/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.conjestion.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

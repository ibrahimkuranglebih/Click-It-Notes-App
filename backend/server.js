import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/notesRoutes.js";
import prisma from "./prisma/prismaClient.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Middleware untuk error handling
app.use((err, req, res, next) => {
  console.error("Error Middleware:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await prisma.note.findMany();
    res.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Gagal mengambil catatan", error: error.message }); 
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const prisma = new PrismaClient();

router.get("/", authenticateToken, async (req, res) => {
  try {
      console.log("User ID dari req.user:", req.user?.id);
      const userId = req.user.id; 

      const notes = await prisma.note.findMany({
          where: { userId },
          orderBy: { tanggalDibuat: "desc" },
      });

      res.json({ notes });
  } catch (error) {
      console.error("Gagal mengambil notes:", error);
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil notes" });
  }
});

export default router;

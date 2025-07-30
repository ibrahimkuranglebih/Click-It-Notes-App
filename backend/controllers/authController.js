import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email dan password wajib diisi" });
        }

        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Email atau password salah" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Email atau password salah" });
        }

        // ✅ Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
        });

        // ✅ Kirim token dalam respons
        res.json({ message: "Login berhasil", user, token });
    } catch (error) {
        console.error("Error saat login:", error);
        res.status(500).json({ error: "Terjadi kesalahan di server" });
    }
};


export const session = async (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.json({});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true }
        });

        res.json({ user });
    } catch (error) {
        res.json({});
    }
};

// 📌 Fungsi GETME
export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error saat mengambil data user:", error);
        res.status(500).json({ message: "Terjadi kesalahan di server" });
    }
};

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ error: "Email dan password wajib diisi" });
        }

        // Cek apakah email sudah digunakan
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email sudah terdaftar" });
        }

        // Hash password sebelum disimpan
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan user baru
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
            },
        });

        res.status(201).json({ message: "Registrasi berhasil", user: newUser });
    } catch (error) {
        console.error("Error saat registrasi:", error);
        res.status(500).json({ error: "Terjadi kesalahan di server" });
    }
};


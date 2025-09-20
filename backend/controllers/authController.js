import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

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

        res.json({ message: "Login Success", user, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "An error occurred on the server" });
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

export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error while retrieving user data:", error);
        res.status(500).json({ message: "An error occurred on the server" });
    }
};

export const register = async (req, res) => {
    try {
        const { email, password, confirmedPassword } = req.body;
        
        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }


        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters" });
        }

        const existingUser = await prisma.user.findUnique({ 
            where: { email } 
        });
        
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        if (password !== confirmedPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
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

        // Generate token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
        });

        res.status(201).json({ 
            message: "Registration successful", 
            user: newUser,
            token 
        });
    } catch (error) {
        console.error("Error during registration:", error);
        
        // Handle error unik constraint khusus
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        
        res.status(500).json({ error: "An error occurred on the server" });
    }
};


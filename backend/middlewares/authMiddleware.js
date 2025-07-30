import jwt from "jsonwebtoken";

// Middleware untuk otentikasi
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || req.cookies?.token; // Ambil token dari Header atau Cookie

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token tidak ditemukan" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token invalid atau telah kedaluwarsa" });
        }
        req.user = user; // Simpan data user ke request
        next();
    });
};

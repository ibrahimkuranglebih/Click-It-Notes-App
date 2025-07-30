import express from 'express';
import { register, login, getMe, session } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.get('/session', session);

router.post('/logout', (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout berhasil" });
});

export default router;

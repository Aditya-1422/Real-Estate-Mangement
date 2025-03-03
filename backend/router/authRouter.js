import express from 'express'
import { google, signIn, signOut, signUp } from '../controller/authController.js';

const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/signout",signOut);
router.post("/google",google);

export default router;
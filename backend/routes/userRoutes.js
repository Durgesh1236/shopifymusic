import express from "express";
import { isAuthenticated, loginUser, logoutUser, myProfile, registerUser, resetPassword, saveToPlaylist, sendResetOtp, sendVerifyOtp, verifyEmail } from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuth, myProfile);
router.get("/logout", isAuth, logoutUser);
router.post("/song/:id", isAuth, saveToPlaylist);
router.post("/send-verify-otp", isAuth, sendVerifyOtp);
router.post("/verify-account", isAuth, verifyEmail);
router.get("/is-auth", isAuth, isAuthenticated);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);
export default router;
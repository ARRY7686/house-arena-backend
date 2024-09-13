import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  send_otp,
  verify_otp,
  reset_password,
} from "../controllers/userController.js";

router.post("/register/otp/send_otp", send_otp);
router.post("/register/otp/verify_otp", verify_otp);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset_password", reset_password);

export default router;

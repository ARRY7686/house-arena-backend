import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  send_otp,
  verify_otp,
} from "../controllers/userController.js";

router.post("/register/otp/send_otp", send_otp);
router.post("/register/otp/verify_otp", verify_otp);
router.post("/register", registerUser);
router.get("/login", loginUser);

export default router;

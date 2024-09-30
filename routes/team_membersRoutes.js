import { Router } from "express";
import { addTeamMember, get_team_members } from "../controllers/team_membersController.js";

const router = Router();


router.get("/", get_team_members);
router.post("/create_new", addTeamMember);

export default router;

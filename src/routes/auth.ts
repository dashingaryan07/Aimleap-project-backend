import express from "express";
import { registerUser } from "../userCtrls/authCtrl";
import { validateInput } from "../middleWare/validateInput";

const router = express.Router();

router.post("/register", validateInput, registerUser);

export default router;
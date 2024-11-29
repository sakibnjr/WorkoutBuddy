import express from "express";

const router = express.Router();

import { userLogin, userRegister } from "../controllers/userController.js";

//login route
router.post("/login", userLogin);

//signup router
router.post("/signup", userRegister);

export default router;

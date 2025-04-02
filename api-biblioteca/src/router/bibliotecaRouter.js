import express from "express";
import {
    createUser,
    listUsers,
    updateUser,
} from "../controllers/bibliotecaController.js";

const router = express.Router();

// User routes
router.post("/user", createUser);
router.get("/user", listUsers);
router.put("/user/:id", updateUser);

export default router;

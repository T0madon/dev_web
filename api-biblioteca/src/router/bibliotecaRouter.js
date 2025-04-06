import express from "express";
import {
    createBook,
    createUser,
    deleteUser,
    listBooks,
    listUsers,
    updateUser,
} from "../controllers/bibliotecaController.js";

const router = express.Router();

// User routers
router.post("/user", createUser);
router.get("/user", listUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Book routers
router.post("/livro", createBook);
router.get("/livro", listBooks);

export default router;

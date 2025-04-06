import express from "express";
import {
    createBook,
    createRental,
    createUser,
    deleteBook,
    deleteUser,
    getBookById,
    listBooks,
    listUsers,
    updateBook,
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
router.get("/livro/:id", getBookById);
router.put("/livro/:id", updateBook);
router.delete("/livro/:id", deleteBook);

// Rental routers
router.post("/locar", createRental);

export default router;

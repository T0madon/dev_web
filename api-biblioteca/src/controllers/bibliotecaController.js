import e from "express";
import { users, books, rentals } from "../db/db.js";

// Funções para obter os itens do BD
const findUserById = (id) => users.find((user) => user.id_user === id);
const findBookById = (id) => books.find((book) => book.id_livro === id);
const findRenatalByUserAndBook = (userId, bookId) =>
    rentals.find(
        (rental) => rental.id_user === userId && rental.id_livro === bookId
    );

// Função auxiliar para lançar erros
const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).send({ erro: "Um erro ocorreu" });
};

// OPERAÇÕES USER

export const createUser = (req, res) => {
    try {
        const { nome, cpf, email, senha } = req.body;

        if (!nome || !cpf || !email || !senha) {
            return res
                .status(400)
                .json({ error: "Todos os campos são obrigatórios" });
        }

        const existingUser = users.find(
            (user) => user.cpf === cpf || user.email === email
        );
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "CPF ou email já cadastrado" });
        }

        const id_user =
            users.length > 0 ? Math.max(...users.map((u) => u.id_user)) + 1 : 1;
        const newUser = { id_user, nome, cpf, email, senha };

        users.push(newUser);
        res.status(200).json(newUser);
    } catch (e) {
        handleServerError(res, e);
    }
};

export const listUsers = (req, res) => {
    try {
        res.json(users);
    } catch (e) {
        handleServerError(res, e);
    }
};

export const updateUser = (req, res) => {
    try {
        const { id } = req.params;
        const { nome, cpf, email, senha } = req.body;
        console.log(id);
        console.log(typeof id);

        const userIndex = users.findIndex(
            (user) => user.id_user === parseInt(id)
        );

        if (userIndex === -1) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const existingUser = users.find((user) => {
            (user.email === email || user.cpf === cpf) &&
                user.id_user !== parseInt(id);
        });

        if (existingUser) {
            res.status(400).json({ error: "CPF/Email já cadastrados" });
        }

        users[userIndex] = {
            ...users[userIndex],
            nome: nome || users[userIndex].nome,
            cpf: cpf || users[userIndex].cpf,
            email: email || users[userIndex].email,
            senha: senha || users[userIndex].senha,
        };
        res.json(users[userIndex]);
    } catch (e) {
        handleServerError(res, e);
    }
};

export const deleteUser = (req, res) => {
    try {
        const { id } = req.params;
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        rentals = rentals.filter((rental) => rental.id_user !== parseInt(id));
        users.splice(userIndex, 1);

        res.status(204).end();
    } catch (e) {
        handleServerError(res, e);
    }
};

// OPERAÇÕES COM BOOK
export const createBook = (req, res) => {
    try {
        const { titulo, isbn, edicao, ano } = req.body;

        if (!id_livro || !titulo || !isbn || !edicao || !ano) {
            return res
                .status(400)
                .json({ error: "Todos os campos são obrigatórios" });
        }

        const existingBook = books.find((book) => book.isbn === isbn);
        if (existingBook) {
            return res.status(400).json({ error: "ISBN já cadastrado" });
        }

        const id_livro =
            books.length > 0
                ? Math.max(...books.map((b) => b.id_livro)) + 1
                : 1;

        const newBook = { id_livro, titulo, isbn, edicao, ano };
        books.push(newBook);

        res.status(201).json(newBook);
    } catch (error) {
        handleServerError(res, e);
    }
};

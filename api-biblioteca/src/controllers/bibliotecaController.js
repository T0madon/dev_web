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
        const userIndex = users.findIndex((user) => user.id === parseInt(id));

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

export const listBooks = (req, res) => {
    try {
        res.json(books);
    } catch (e) {
        handleServerError(res, e);
    }
};

export const getBookById = (req, res) => {
    try {
        const { id } = req.params;
        const book = findBookById(id);

        if (!book) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        res.json(book);
    } catch (e) {
        handleServerError(res, e);
    }
};

export const updateBook = (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, isbn, edicao, ano } = req.body;

        const bookIndex = books.findIndex(
            (book) => book.id_livro === parseInt(id)
        );
        if (bookIndex === -1) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        const existingBook = books.find((book) => {
            book.isbn === isbn && book.id_livro !== parseInt(id);
        });
        if (existingBook) {
            res.status(400).json({
                error: "ISBN já cadastrado em outro livro",
            });
        }

        books[bookIndex] = {
            ...books[bookIndex],
            titulo: titulo || books[bookIndex].titulo,
            isbn: isbn || books[bookIndex].isbn,
            edicao: edicao || books[bookIndex].edicao,
            ano: ano || books[bookIndex].ano,
        };

        res.json(books[bookIndex]);
    } catch (e) {
        handleServerError(res, e);
    }
};

export const deleteBook = (req, res) => {
    try {
        const { id } = req.params;
        const bookIndex = books.findIndex(
            (book) => book.id_livro === parseInt(id)
        );

        if (bookIndex === -1) {
            return res.status(400).json({ error: "Livro não encontrado" });
        }

        rentals = rentals.filter((rental) => rental.id_livro !== parseInt(id));
        books.splice(bookIndex, 1);

        res.status(204).end();
    } catch (e) {
        handleServerError(res, e);
    }
};

// OPERAÇÕES COM RENTALS

export const createRental = (req, res) => {
    try {
        const { id_user, id_livro, status } = req.body;

        if (!id_user || !id_livro || !status) {
            return res
                .status(400)
                .json({ error: "Todos os campos são obrigatórios" });
        }

        const user = findUserById(parseInt(id_user));
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const book = findBookById(parseInt(id_livro));
        if (!book) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        const existingRental = findRenatalByUserAndBook(
            parseInt(id_user),
            parseInt(id_livro)
        );
        if (existingRental) {
            return res
                .status(400)
                .json({ error: "Locação já existe para este usuário e livro" });
        }

        const newRental = {
            id_user: parseInt(id_user),
            id_livro: parseInt(id_livro),
            status,
        };
        rentals.push(newRental);

        res.status(201).json(newRental);
    } catch (e) {
        handleServerError(res, e);
    }
};

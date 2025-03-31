import { users, books, rentals } from "../db/db";

// Funções para obter os itens do BD
const findUserById = (id) => {
    users.find((user) => user.id_user === id);
};
const findBookById = (id) => {
    books.find((book) => book.id_livro === id);
};
const findRenatalByUserAndBook = (userId, bookId) => {
    rentals.find(
        (rental) => rental.id_user === userId && rental.id_livro === bookId
    );
};

// Função auxiliar para lançar erros
const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).send({ erro: "Um erro ocorreu" });
};

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

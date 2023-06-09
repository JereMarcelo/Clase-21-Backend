import UserService from "../dao/services/user.service.js";

class UserController {
    #service;
    constructor(service) {
        this.#service = service
    }
    async create(req, res, next) {
        const email = req.session.user;
        if (email) {
            return res.redirect('/perfil');
        }
        const usuario = req.body;

        try {
            const { _id } = await this.#service.create(usuario);

            res.status(201).send({ id: _id });
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req, res, next) {
        const { skip, limit, ...query } = req.query;

        try {
            const usuarios = await this.#service.find(query, {
                skip: Number(skip ?? 0),
                limit: Number(limit ?? 10),
            });
            res.send({
                usuarios: usuarios.docs,
                total: usuarios.totalDocs,
                totalPages: usuarios.totalPages,
                hasNextPage: usuarios.hasNextPage,
                hasPrevPage: usuarios.hasPrevPage,
            });
        } catch (error) {
            next(error);
        }
    }
    async userId(req, res, next) {
        try {
            const idUsuario = req.params.idUsuario;

            const usuario = await this.#service.findById({ _id: idUsuario });
            if (!usuario) {
                res
                    .status(404)
                    .send({ error: `Usuario con el id ${idUsuario} no encontrado` });
                return;
            }
            res.send({ usuario });
        } catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        const idUsuario = req.params.idUsuario;
        try {
            const usuario = await this.#service.findById({ _id: idUsuario });
            if (!usuario) {
                res
                    .status(404)
                    .send({ error: `Usuario con el id ${idUsuario} no encontrado` });
                return;
            }
            const nuevosDatos = req.body;

            await this.#service.update(
                { _id: idUsuario },
                { ...usuario, ...nuevosDatos }
            );
            res.send({ ok: true });
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const idUsuario = req.params.idUsuario;
            await this.#service.delete({ _id: idUsuario });
            res.send({ ok: true });
        } catch (error) {
            next(error);
        }
    }
}

const controller = new UserController(new UserService())
export default controller
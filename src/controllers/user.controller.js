import { userModel } from "../models/user.model";


export const findOne = async (req, res, next) => {
    try{
        const data = await userModel.findById(req.params.id)
        res.send(data);
        } catch (error) {
            next (error);
    }
}

export const findAll = async (req, res, next) => {
    try {
        const data = await userModel.paginate();
        res.send(data);
    } catch (error) {
        next(erorr);
    }
}

export const create = async (req, res, next) => {
    try {
        const data = await userModel.create(req.body);
        res.send(data);
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        await model.updateOne({_id: req.params.id }, req.body);
        const data = await userModel.findById(req.params.id)
        res.send(data);
    } catch (error) {
        next (error);
    }
}

export const remove = async (req, res, next) => {
    try {
        const data = await userModel.findByIdDelete(req.params.id)
        res.send(data);
    } catch (error) {
        next (error);
    }
}

//Tengo que importar una ruta...
//import {findOne, findAll, create, update, remove}from '../controllers/user.controller.js;
// Me quede en el minuto 53:59 de "Arquitectura de capas" 
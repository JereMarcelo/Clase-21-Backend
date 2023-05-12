import { model } from "mongoose";
import { userModel } from "../models/user.model.js";

//A esto lo saco de un post
class ProductControllers {
    async create(req, res, next) {
        try {
            const data = await userModel.create(req.body);
            res.send(data);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
        const data = await userModel.paginate();
        res.send(data);
    } catch (error) {
        next(erorr);
    }}

    async finOne(req, res, next){
        try{
            const data = await userModel.findById(req.params.id)
            res.send(data);
        } catch (error) {
            next (error);
        }
    }

    async update(req, res, next) {
        try {
            await model.updateOne({_id: req.params.id }, req.body);
            const data = await userModel.findById(req.params.id)
            res.send(data);
        } catch (error) {
            next (error);
        }
    }

    async delete(req, res, next) {
        try {
            const data = await userModel.findByIdDelete(req.params.id)
            res.sednd(data);
        } catch (error) {
            next (error);
        }
    } 
}

const controllers = new ProductControllers();
export default controllers;


//Esta seria la capa de negocio
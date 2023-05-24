import { userModel } from "../models/user.model.js"

class UserService {
    #model
    constructor() {
        this.#model = userModel;
    }
    async create(data) {
        return this.#model.create(data);
    }
    async find() {
        return this.#model.paginate();

    }
    async findById(id) {
        return this.#model.findById(id)

    }
    async update(id, data) {
        await this.#model.updateOne({ _id: id }, data)
        const updatedData = await this.findById(id)
        return updatedData
    }
    async delete(id) {
        return this.#model.findByIdAndDelete(id)
    }
}

export default UserService
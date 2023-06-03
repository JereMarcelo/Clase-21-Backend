import ticketModel from "../models/ticket.model.js"

class TicketService {

    async find() {
        return ticketModel.find()
    }

    async findOne(_id) {
        return ticketModel.findById(_id)
    }

    async create(data) {
        return ticketModel.create(data)
    }

    async delete(_id) {
        return ticketModel.deleteOne(_id)
    }

    async findByCartId(cartId) {
        return ticketModel
            .findOne({ cartId })
            .sort({ purchase_datetime: -1 })
            .populate("purchased_products.product");
    }
    async findByEmail(email) {
        return ticketModel.find({ purchaser: email });
    }
    async findByCode(code) {
        return ticketModel.findOne({ code: code });
    }
}

export default TicketService;
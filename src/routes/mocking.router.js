import { Router } from 'express'
import controller from "../controllers/mocking.controller.js"

const route = Router()

route.get('/', controller.generateProduct.bind(controller))


export default route
import { Router } from "express";
//import controller from "../controllers/"

const route = Router()

route.get('/', controller.loggerTest.bind(controller))

export default route
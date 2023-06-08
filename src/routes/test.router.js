import { Router } from "express";
import { faker } from "@faker-js/faker";
import logger from "../logger/winston-logger.js";

const users = [];
const router = Router();

router.get("/user", (req, res) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    logger.info('creating test user', { firstName, lastName, email, password });
    res.send({ firstName, lastName, email, password });
});

export default router;
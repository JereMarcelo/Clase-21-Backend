import { Router } from 'express';
import { userModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const SECRET = 'Secreto_todavia'
const users = [];
const route = Router();

route.post('/register', (req, res) => {})

route.get('/data', (req, res) => {

})

function generateToken(user){
    const token = jwt.sign({user}, SECRET, { expiresIn: '24h'});
    return token;
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token= authHeader?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);

    }
    jwt.verify(token, SECRET, (err, payload) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = payload.user;
        next();
    });
    

}

export default route;
export default class CustomError extends Error {
    consturctor(code, message) {
        super(message);
        this.code = code;
    }
}
export class BadRequestError extends CustomError {
    constructor(message) {
        super(400, message);
    }
}
export class NotFoundError extends CustomError {
    constucotr(message) {
        super(404, message);
    }
}
export class NotAutheticatedError extends CustomError{
    constructor(message) {
        super(403, message);
    }
}
export class NorAuthenticatedError extends CustomError{
    constructor(message){
        super(401, message);
    }
}
export class InternalServerError extends CustomError{
    consturctor(message){
        super(500, message);
    }
}
import LoggerService from '../dao/services/logger.service.js';

class LoggerController {
    #loggerService
    constructor () {
        this.#loggerService = new LoggerService()
    }
    logegerTest (req, res) {
        this.#loggerService.loggerTest()
        res.send('Los Registros fueron creados exitosamente')
    }
}
const controller = new LoggerController()
export default  controller
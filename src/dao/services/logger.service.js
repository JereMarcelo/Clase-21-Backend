import logger from "../../logger/winston-logger.js";

class loggerService {
    loggerTest () {
        logger.debug('debuggin log')
        logger.http('http log')
        logger.info('info log')
        logger.warn('warning log')
        logger.error('error log')
        logger.fatal('fatal log')
    }
}
export default loggerService
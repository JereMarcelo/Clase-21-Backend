import winston from "winston";

const logger = winston.createLogger ({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),

    ),
    timestamp: true,
    transports: [
        new winston.transports.File({
        filename:'/log/errors.log',
        level:'error',
    }),
    new winston.transports.File({ filename: '/log/combined.log' }),
    //new winston.transports.MongoDB(options)
    ],
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
    next();
}

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
    );
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
        level: "http",
    }),)
}

const httpLogger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    timestamp: true,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
            level: "http",
        }),
    ],
});

export const loggerMiddleware = (req, res, next) => {
    req.logger = logger;
    req.logger.error(`${req.method} in ${req.url}`);
    next();
} 

export default winston;
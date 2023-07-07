import * as path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';



const swaggerOptions ={
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Adopte API',
            version: '1.0.0',
            description: 'Adoptme API Information',
        },
        servers: [
            {
                url: "https://production.server.com",
                description: "Servidor productivo",
            },
            {
                url: "https://qa.server.com",
                description: "Servidor de qa",
            },
        ]
    },
    apis: [
        path.resolve("./src/docs/**/*.yaml"),
        path.resolve("./src/routes/*.js"),
    ],
};

const spec = swaggerJSDoc(swaggerOptions);
export default spec;


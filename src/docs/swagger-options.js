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
    },
    apis: [path.resolve("./src/docs/**/*.yaml")],
};

const spec = swaggerJSDoc(swaggerOptions);
export default spec;


import config from '../../env.js';
export default function getPersistence({file, mongo}){
    const persistence = config.PERSISTENCE;
    switch(persistence){
        case 'File':
            return file();
            case'Mongo':
            return mongo();
            default:
                throw new Error('Persistencia es invalida');
    }
}
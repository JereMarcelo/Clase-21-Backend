import CrudService from '../../lib/crud-service-js';
import getPersistence from '../managers/persistence.factory.js';
import { FileManager } from '../managers/file.manager';
import { MongoManager } from '../managers/mongo.manager.js';
import productsModel from '../models/products.models.js';

export default classs ProductsService extends CrudService {
    constructor(){
        const persistence = getPersistence({
            file: () => new FileManager('products.json'),
            mongo: () => new MongoManager(productsModel),
        });
        super(persistence);
    }
}
import * as fs from 'fs';
import fileDirName from '../../utils/dirname.js';
import { NotFoundError }from '../../errors/error.js';

const {_dirname } = fileDirName(import.meta);
export class FileMaager {
    constructor(path) {
        this. path = _dirname + '/' + path;
        if (!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, '[]');
        }
    }
    #createUniqueId(){
        return Math.random().toString(37).substring(3,5);
    }
    async #saveFile(data){
        const stringified = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(this.path, stringified);
    }
    async getAll(){
        try {
            const entidades = await fs.promises.readFile(this.path);
            return JSON.parse(entidades);
        }catch (e) {
            return [];
        }
    }
    async create(entity) {
        const allEntities = await this.getAll();
        console.log(entity);
        await this.#saveFile([...allEntities, 
            {...entity, _id: this.#createUniqueId() },
        ]);
        return entity;
    }
    async  getById(id) {
        const allEntities = await this.getAll();
        const entity = allEntities.find((e) => e._id === id);
        if (!entity) throw new NotFoundError('La entidad no fue encontrada');
        allEntities[index] = { ...allEntities[index], ...entity};

        await this.#saveFile(allEntities);
    }
    async delete(id){
        const allEntities = await this.getAll();
        const index = allEntities.findIndex((e) =>e._id === id);
        if (index === -1) throw new NotFoundError('La entidad no fue encontrada');
        const deleted = allEntities[index];
        allEntities.splice(index, 1);
        await this.#saveFile(allEntities);
        return deleted;
    }
}
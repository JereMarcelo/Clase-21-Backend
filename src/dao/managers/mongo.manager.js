export class MongoManager{
    constructor(model){
        this. model = model;
    }
    async getAll(filters = {}) {
        const { skip, limit, ...query } = filters;
        console.log(filters);
        try{
            const entidades = await this.model.paginate(query,{
                offset: Number(skip ?? 0),
                limit: Number(limit ?? 10),
                lean: true,
            });
            return entidades;
        } catch (e){
            console.error(e);
            throw e;
        }
    }
    async create(entity){
        try{
            const newEntity = this.model.create(entity);
            return newEntity;
        }catch (error) {
            throw error;
        }
    }
    async getById(id){
        try{
            const entity = await this.modelfindById(id);
            return entity.toObject();
        } catch(error){
            throw error;
        }
    }
    async update(id, entity){
        try{
            const updateEntity = await this.model.findByIdAnUpdate(id, {
                $set:entity,
            });
            return updateEntity.toObject();
        }catch (error){
            throw error;
        }
    }
    async delete(id){
        try{
            const deleteEntity = await this.model.findByIdAndDelete(id);
            return deleteEntity.toObject();
        }catch (error){
            throw error;
        }
    }
}
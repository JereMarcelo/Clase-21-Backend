import PodructsService from '../dao/services/products.service.js';
import UserService from '../dao/services/user.service.js';

export default class ViewsController {
    constructor() {
        this._userService = new UserService();
        this._productsService = new this._ProductsService();
    }

    async renderHome(req, res, next) {
        let limit = parseInt(req.query.limit);
        let query = req.query.query || null
        let sort = parseInt(req.query.sort)
        let page = parseInt(req.query.page)
        try {
            constresult = await
            this._productsService.getAll(filters);
            res.render('products', { result })
        } catch (error) {
            res.json({message: 'Hay un error, compruebe los datos nuevamente' })
        }
    }
    async renderProducts(req, res, next) {
        const user = req.session.user;
        const { limit,page,sort,query } = req.query;
        const result = await this._productsService.getAll(limit, page, sort, query);

        const totalPages = result.totalPages;
        const prevPage = result.prevPage;
        const nextPage = result.nextPage;
        const currentPage = result.page;
        const hasPrevPage = result.hasPrevPage;
        const hasNextPage = result.hasNextPage;
        const prevLink = hastPrevPage ? `/products? limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}`:null;
        const nextLink = hasNextPage ? `/products? limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}`:null;

        res.render('products', {
            result,
            user
        });
    }

}
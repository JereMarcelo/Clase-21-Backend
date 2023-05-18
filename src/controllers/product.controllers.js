import productDao from "../dao/productDao.js";

export const getAllProducts = async (req, res) => {
    let limit = parseInt(req.query.limit)
    let query = req.query.query || null
    let sort = parseInt(req.query.sort)
    let page = parseInt(req.query.page)
    try {
        let result = await productDao.getProducts(limit, JSON.parse(query), sort, page)
        res.json(
            {
                status: 'success',
                payload: result,
            })
    } catch (error) {
        res.json({ message: 'Ha ocurrido un error, verifique bien los datos ingresados' })
    }
}

export const getProductById = async (req, res) => {
    let pid = (req.params.pid);
    try {
        res.json(await productDao.getProductById(pid))
    } catch (error) {
        res.json({ error })
    }
}

export const postProduct = async (req, res) => {
    const { title, description, category, price, thumbnail, code, stock } = req.body;

    try {
        let addedProduct = await productDao.createProduct({
            title, description, category, price, thumbnail, code, stock
        })
        res.status(201).json({ info: 'Producto Agregado', addedProduct })
    } catch (error) {
        console.log("Ha ocurrido un error: \n", error)
        res.status(400).json({ info: `Ha ocurrido un error: ${error}` })
    }
}

export const putProduct = async (req, res) => {
    const pid = (req.params.pid)
    const updatedValue = req.body
    try {
        await productDao.updateProduct(pid, updatedValue)
        res.send({ status: 200, payload: updatedValue })
    } catch (error) {
        res.json({ error })
    }
}

export const deleteProduct = async (req, res) => {
    let pid = (req.params.pid)
    try {
        await productDao.deleteProduct(pid)
        res.json({ status: 200, message: 'Producto eliminado' })
    } catch (error) {
        res.json({ error })
    }
}
import MockingService from '../dao/services/mocking.service.js'

class MockingController {
  #mockingService
  constructor () {
    this.#mockingService = new MockingService()
  }

  generateProduct (req, res) {
    const products = Array.from({ length: 50 }, () => this.#mockingService.generateProduct())
    if (!products) 
        res.send({error: "No hay productos"})
    else{
        res.send({ status: 'ok', payload: products })
    } 
  }
}


const controller = new MockingController()
export default controller
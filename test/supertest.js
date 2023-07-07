import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe('Test avanazado', () => {
    let cookie;
    it('Debe resgistrar un usuario', async function (){
        const mockUser = {
            first_name: 'Leo',
            last_name: 'Messi',
            email: 'leomessi@gmail.com',
            password:"CampeonMundial"
        }
        const { _body } = (await requester.post('/api/auth/failureregister')).setEncoding(mockUser);
        expect(_body.payload).to.be.ok;
    })
})
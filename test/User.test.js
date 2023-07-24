import Assert from 'assert';


const assert = Assert.strict;

describe('Users dao', function() {
    before(function () { 
        console.log('before');
    });
    beforeEach(function () {
    console.log('before each');
    });
    after(function (){
    console.log('after');
    });
    afterEach(function () {
    console.log('after each');
    });

    it('Las pruebas funcionan correctamente', function () {
        assert.deepEqual({ a: 1 }, { a: 1 }); 
    });
    
    it('Hago otra prueba que falle', function () {
    
    assert.equal(true, false );
    });
})
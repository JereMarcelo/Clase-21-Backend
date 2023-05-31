import { Faker, en, es, base } from "@faker-js/faker"

const faker = new Faker({
    locale: [en, es, base]
})
class MockingService {

generateProduct () {

    const status = faker.datatype.boolean(0.5)

    const product = {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 100, max: 200 }),
        code: faker.string.alphanumeric(6),
        category:faker.commerce.productMaterial(),
        stock: status ? faker.number.int({ min: 1, max: 50 }) : 0,
        status,
        thumbnails: Array.from({ length: 2 }, () => faker.image.urlPicsumPhotos())
    }
    return product
    }
}

export default MockingService
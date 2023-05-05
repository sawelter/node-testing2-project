const db = require('../../data/db-config');
const Hero = require ('./heroes-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

describe('getAll()', () => {
    test('get all returns all heroes', async () => {
        const result = await Hero.getAll();
        expect(result).toHaveLength(4);
        expect(result[0]).toMatchObject({name: 'deku'});
        expect(result[1]).toMatchObject({name: 'bakugo'});
        expect(result[2]).toMatchObject({name: 'uravity'});
        expect(result[3]).toMatchObject({name: 'ingenium'});
    })
})

describe('getById(id)', () => {
    test('getById(id) returns the hero with the given id', async () => {
        let result = await Hero.getById(1);
        expect(result).toMatchObject({name: 'deku'});
        result = await Hero.getById(2);
        expect(result).toMatchObject({name: 'bakugo'});
        result = await Hero.getById(3);
        expect(result).toMatchObject({name: 'uravity'});
        result = await Hero.getById(4);
        expect(result).toMatchObject({name: 'ingenium'});
    })
})

describe ('insert(hero)', () => {
    const shoto = { name: 'shoto' };
    test('insert returns the hero that was inserted', async () => {
        const result = await Hero.insert(shoto);
        expect(result).toMatchObject(shoto);
    });
    test('insert adds the hero to the database', async () => {
        await Hero.insert(shoto);
        const heroes = await db('heroes');
        expect(heroes).toHaveLength(5);
        expect(heroes[4]).toMatchObject(shoto)
    })
})
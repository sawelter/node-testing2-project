const db = require('../../data/db-config');
const request = require('supertest');
const server = require('../server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

describe('[GET] /heroes', () => {
    test('returns array of heroes', async () => {
        const result = await request(server).get('/heroes');
        expect(result.body).toHaveLength(4);
        expect(result.body[0]).toMatchObject({name: 'deku'});
        expect(result.body[1]).toMatchObject({name: 'bakugo'});
        expect(result.body[2]).toMatchObject({name: 'uravity'});
        expect(result.body[3]).toMatchObject({name: 'ingenium'});
    })
});


describe('[GET] /heroes/:id', () => {
    test('returns hero by id', async () => {
        let hero = await request(server).get('/heroes/1');
        expect(hero.body).toMatchObject({name: 'deku'});
        hero = await request(server).get('/heroes/2');
        expect(hero.body).toMatchObject({name: 'bakugo'});
        hero = await request(server).get('/heroes/3');
        expect(hero.body).toMatchObject({name: 'uravity'});
        hero = await request(server).get('/heroes/4');
        expect(hero.body).toMatchObject({name: 'ingenium'});
    });
});

describe('[POST] /heroes', () => {
    const shoto = { name: 'shoto' };
    test('returns the hero that was posted', async () => {
        const result = await request(server).post('/heroes').send(shoto);
        expect(result.body).toMatchObject(shoto);
    });
    test('adds the hero to the database', async () => {
        await request(server).post('/heroes').send(shoto);
        const heroes = await db('heroes');
        expect(heroes).toHaveLength(5);
        expect(heroes[4]).toMatchObject(shoto)
    })
})
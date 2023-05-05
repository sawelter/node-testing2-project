const db = require('../../data/db-config.js');

function getAll() {
    return db('heroes');
}

function getById(id) {
    return db('heroes').where('id', id).first();
}

async function insert(hero) {
    const [id] = await db('heroes').insert(hero);
    return getById(id);
}


module.exports = {
    getAll,
    getById,
    insert
}
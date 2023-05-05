const express = require('express');
const router = express.Router();
const Hero = require('./heroes-model');


// get all heroes
router.get('/', (req, res, next) => {
    Hero.getAll()
        .then(heroes => {
            res.status(200).json(heroes);
        })
        .catch(next);
});

// get hero by id
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Hero.getById(id)
        .then(hero => {
            res.status(200).json(hero);
        })
        .catch(next);
});


// insert hero
router.post('/', async (req, res, next) => {
    try {
        const newHero = await Hero.insert(req.body);
        res.status(201).json(newHero);
    } catch(err) {
        next(err);
    }
})


module.exports = router;
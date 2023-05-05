const express = require('express');
const router = express.Router();
const Hero = require('./heroes-model');


// get all heroes
router.get('/', (req, res, next) => {
    res.status(500).json('get all heroes endpoint');
});

// get hero by id
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    res.json(`get hero by id endpoint, id: ${id}`);
});


// insert hero
router.post('/', (req, res, next) => {
    res.json('post hero');
})


module.exports = router;
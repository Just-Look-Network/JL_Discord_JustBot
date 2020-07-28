module.exports = (app) => {
    const passport = require('passport');
    const jwtStrat = require('../passport/jwt');

    const tutorials = require('../controllers/tutorial.controller.js');

    var router = require('express').Router();

    // ---------------------------------------------------------------------------
    // Create a new Tutorial TEST
    router.post('/', passport.authenticate('jwt', { session: false }), tutorials.create);

    // ---------------------------------------------------------------------------
    // Retrieve all Tutorials
    router.get('/', passport.authenticate('jwt', { session: false }), tutorials.findAll);

    // ---------------------------------------------------------------------------
    // Retrieve all published Tutorials
    router.get('/published', passport.authenticate('jwt', { session: false }), tutorials.findAllPublished);

    // ---------------------------------------------------------------------------
    // Retrieve a single Tutorial with id
    router.get('/:id', passport.authenticate('jwt', { session: false }), tutorials.findOne);

    // ---------------------------------------------------------------------------
    // Update a Tutorial with id
    router.put('/:id', passport.authenticate('jwt', { session: false }), tutorials.update);

    // ---------------------------------------------------------------------------
    // Delete a Tutorial with id
    router.delete('/:id', passport.authenticate('jwt', { session: false }), tutorials.delete);

    // ---------------------------------------------------------------------------
    // Create a new Tutorial
    router.delete('/', passport.authenticate('jwt', { session: false }), tutorials.deleteAll);

    app.use('/api/tutorials', router);
};

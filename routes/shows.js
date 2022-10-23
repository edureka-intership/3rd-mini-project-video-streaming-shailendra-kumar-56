const express = require('express');
const Controllers = require('../controllers/shows');

const router = express.Router();

router.get('/shows', Controllers.listAPI);
router.get('/shows/:id/', Controllers.detailAPI)

router.get('/stream/:id', Controllers.streamAPI)

module.exports = router;

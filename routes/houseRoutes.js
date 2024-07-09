const express = require('express');
const { getHouses, createHouse } = require('../controllers/houseController');
const router = express.Router();

router.get('/', getHouses);
router.post('/', createHouse);

module.exports = router;

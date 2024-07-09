const express = require('express');
const { getHouses, updateHousePoints } = require('../controllers/houseController');
const router = express.Router();

router.get('/', getHouses);
router.put('/:id', updateHousePoints);

module.exports = router;

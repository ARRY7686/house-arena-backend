const express = require('express');
const { getHouses, updateHousePoints } = require('../controllers/houseController');
const router = express.Router();

router.get('/', getHouses);
router.put('/', updateHousePoints);

module.exports = router;

var express = require('express');
var meterReadingController = require('../controllers/meterReading');

var router = express.Router();

router.route('/api/meterReadings')
    .post(meterReadingController.postMeterReadings)
    .get(meterReadingController.getMeterReadings);

router.route('/api/meterReadings/:id')
    .get(meterReadingController.getMeterReading)
    .put(meterReadingController.putMeterReading)
    .delete(meterReadingController.deleteMeterReading);

module.exports = router;
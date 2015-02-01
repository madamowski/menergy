var mongoose = require('mongoose');

var meterReadingSchema = new mongoose.Schema({
   date: Date,
   gas: Number,
   electricity: Number,
   userId: String
});

module.exports = mongoose.model('MeterReading',meterReadingSchema);


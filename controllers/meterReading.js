var MeterReading = require('../models/meterReading');

// Create endpoint /api/meterReadings for POSTS
exports.postMeterReadings = function(req, res) {
  // Create a new instance of the Beer model
  var meterReading = new MeterReading();

  console.info('gas.body:'+req.body.gas);
  console.info('gas.header:'+req.header.gas);    
    
  // Set the beer properties that came from the POST data
  meterReading.date = req.body.date;
  meterReading.gas = req.body.gas;
  meterReading.electricity = req.body.electricity;
  meterReading.userId = req.user._id;

  // Save the beer and check for errors
  meterReading.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Meter Reading saved', data: meterReading });
  });
};

// Create endpoint /api/meterReadings for GET
exports.getMeterReadings = function(req, res) {
  // Use the Beer model to find all beer
  MeterReading.find({ userId: req.user._id }, function(err, meterReadings) {
    if (err)
      res.send(err);

    res.json(meterReadings);
  });
};

// Create endpoint /api/meterReadings/:meterReading for GET
exports.getMeterReading = function(req, res) {
  // Use the Beer model to find a specific beer
  MeterReading.findById(req.params.id, function(err, meterReading) {
       
    if (err)
      res.send(err);

    res.json(meterReading);
  });
};

// Create endpoint /api/meterReadings/:meterReading for PUT
exports.putMeterReading = function(req, res) {
  // Use the Beer model to find a specific beer
  MeterReading.findById({ userId: req.user._id, _id: req.params.id }, function(err, meterReading) {  
    if (err)
      res.send(err);

    // Update the existing beer quantity
    meterReading.gas = req.body.gas;
    meterReading.electricity = req.body.electricity;

    // Save the beer and check for errors
    meterReading.save(function(err) {
      if (err)
        res.send(err);

      res.json(meterReading);
    });
  });
};

// Create endpoint /api/meterReadings/:meterReading for DELETE
exports.deleteMeterReading = function(req, res) {
    
  console.info("delete:id",req.params.id);     
    
  // Use the Beer model to find a specific beer and remove it
  MeterReading.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Meter Reading removed' });
  });
};
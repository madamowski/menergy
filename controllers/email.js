// Create endpoint /api/testemail for GET
exports.testEmail = function(req, res) {
    
  console.info('testEmail');  
    
  var sendgrid  = require('sendgrid')(
      process.env.SENDGRID_USERNAME, 
      process.env.SENDGRID_PASSWORD);
    
    sendgrid.send({
        to:       req.body.mailto,
        from:     req.body.mailfrom,
        subject:  'Hello World',
        text:     'My first email through SendGrid.'
    }, 
    function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
    });
    
};
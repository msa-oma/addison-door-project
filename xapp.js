const mqtt = require('mqtt') 
const client  = mqtt.connect('mqtt://test.mosquitto.org')


 
//const client  = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt by msa.. ')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})



















/////////////////////

// var express = require('express');
// var router = express.Router();
// var SerialPort = require('serialport');


// SerialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//       console.log(port.comName, port.pnpId, port.manufacturer); // or console.log(port)
//   });
// });

// router.get('/', function(req, res){
//   function sendData(code, msg) {
//       res.statusCode = 500;
//       res.write(msg);
//       console.log(msg);   
//   }

//   var port = new SerialPort("COM1", {
//       baudRate: 38400
//   });

//   port.on('open', function() {
//       port.write(Buffer.from('status1', 'ascii'), function(err) {
//           if (err) 
//               return sendData(500, err.message);

//           console.log('message written');
//       });
//   });

//   var buffer = '';
//   port.on('data', function(chunk) {
//       buffer += chunk;
//       var answers = buffer.split(/\r?\n/);//Split data by new line character or smth-else
//       buffer = answers.pop(); // Store unfinished data

//       if (answer.length > 0) 
//           sendData(200, answer[0]);
//   });

//   port.on('error', function(err) {
//       sendData(500, err.message);
//   });
// });

// module.exports = router;
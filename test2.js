const mqtt = require('mqtt');
 






////////////////////////////////
// Import dependencies
let barcode=1234;
const Serialport=require("serialport");
const Readline=require("@serialport/parser-readline");

console.log('pass the barcode please')
// Defining the serial port
const port=new Serialport("COM1",{
  baudRate:9600,
})

// The Serial port parser
const parser =new Readline();
port.pipe(parser);

function getBarCodeNum(value){
    return value;
}
       
// Read the data from the serial port
parser.on("data", (line) => {console.log(line)
 barcode= line;
console.log(" hi the code is "+ barcode   );
}
);

 

// Write the data to the serial port
port.write("whatever message ... ");
 
///////////////////////////////
// Connection variables


let broker_host = 'broker.hivemq.com';
let broker_port = 1883;
//let client_id = 'ys_client';
let client_id = barcode;

// Publish variables
let pub_topic = 'ys/pub';
let message = 'Greetings from ' + client_id.toString();
let pub_options = {qos: 0, retain: false};

// Subscribe variables
let sub_topic = 'ys/pub';
let sub_options = {qos: 0};


const connection_options = {
    port: broker_port,
    host: broker_host,
    clientId: client_id,
    reconnectPeriod: 5000 // Try reconnecting in 5 seconds if connection is lost
};

const client = mqtt.connect(connection_options);

client.on('message', function (topic, message) {
    console.log("Received message " + message.toString() + " on topic: " + topic.toString());
})

client.on('connect', async function () {
    console.log('Connection successful');
    client.subscribe(sub_topic, sub_options, function (err) {
        if (err) {
            console.log("An error occurred while subscribing")
        } else {
            console.log("Subscribed successfully to " + sub_topic.toString())
        }
    });

    while (client.connected) {
        client.publish(pub_topic, message, pub_options, function (err) {
            if (err) {
                console.log("An error occurred during publish")
            } else {
                console.log("Published successfully to " + pub_topic.toString())
            }
        });

        // Delay of 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
})

// Handle errors
client.on("error", function (error) {
    console.log("Error occurred: " + error);
});

// Notify reconnection
client.on("reconnect", function () {
    console.log("Reconnection starting");
});

// Notify offline status
client.on("offline", function () {
    console.log("Currently offline. Please check internet!");
});
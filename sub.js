const mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://broker.hivemq.com');

console.log("first message ...") 

client.on('connect',function(){
    console.log("Second message ...") 

    client.subscribe('msa');
    console.log("client has subscribed successfuly");
 
});
 
client.on('message',function(topic,message){
    console.log("msa msa msa msa msa  msa ...");

    console.log(message.toString());
})
 
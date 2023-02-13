const mqtt = require('mqtt') 
var client  = mqtt.connect('mqtt://broker.hivemq.com') 
//const client  = mqtt.connect('mqtt://test.mosquitto.org')

 console.log("first message ...")

client.on('connect',  function(){
    setInterval(async function(){
        console.log("Second message ...") 
        var random = Math.random()*50 
         console.log(random) 
         if(random<30){
            client.publish('msa','simple MQTT using hiveqm'+random.toString()+'..') 
             
         }
    }),30000
}) 

// client.on('connect ',function(){
//     console.log("Second message ...") 

//     client.subscribe("msa sub");
//     console.log("client has subscribed successfuly");
 
// });
 
// client.on('message ',function(topic,message){
//     console.log(message.toString());
// })
 

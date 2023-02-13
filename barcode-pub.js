const mqtt = require('mqtt') 
var client  = mqtt.connect('mqtt://broker.hivemq.com') 
//const client  = mqtt.connect('mqtt://test.mosquitto.org')



// Import dependencies
const Serialport=require("serialport");
const Readline=require("@serialport/parser-readline");

let barcodexx ;

async  function getBarCodeNum(value){
barcodexx =await value;
       
}



console.log('pass the barcode please')
// Defining the serial port
const port=new Serialport("COM1",{
  baudRate:9600,
})

// The Serial port parser
const parser =new Readline();
port.pipe(parser);


       
// Read the data from the serial port
parser.on("data", (line) => {console.log(line)
getBarCodeNum(line)
console.log("your code is >>>>>>>>>>"+barcodexx);
client.publish('msa','code comming from com1 '+barcodexx) 

console.log(" hi the code is "+ line   );
}
);

 

// Write the data to the serial port
port.write("whatever message ... ");

 console.log("first message ...")

client.on('connect', async function(){
      
        console.log("Second message ...") 
        // var random = Math.random()*50 
          console.log(barcodexx) 
          
            client.publish('msa','  >>>>> employee code :  '+barcodexx) 
             
          
    }) 
 
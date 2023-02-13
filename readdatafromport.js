
let barcodexx ;

async  function getBarCodeNum(value){
barcodexx =await value;
       
}

// Import dependencies
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


       
// Read the data from the serial port
parser.on("data", (line) => {console.log(line)
getBarCodeNum(line)
console.log("your code is >>>>>>>>>>"+barcodexx);

console.log(" hi the code is "+ line   );
}
);

 

// Write the data to the serial port
port.write("whatever message ... ");






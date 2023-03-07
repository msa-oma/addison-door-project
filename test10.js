const gre = new Map();
const greenCards = [2082, 1012, 1013]; //List of persons who can pass directly ##just example

const Serialport = require("serialport");
const Readline = require("@serialport/parser-readline");

console.log("pass the barcode please");

// Defining the serial port
const port = new Serialport("COM1", {
  baudRate: 9600,
});
// The Serial port parser
const parser = new Readline();
port.pipe(parser);

// Read the data from the serial port
parser.on("data", (line) => {
  // console.log(line);
  //console.log("your code is >>>>>>>>>>"+barcode);
  barcode = line;
  if(!(employyesMap.has(barcode))){
    employyesMap.set(barcode,new employeeStatus());
  }
  
  handleEnterRequest(barcode);
  //console.log(">>>" + workersMap.get(barcode));
});


// handle epmloyee exit request
function handleEnterRequest(barcode) {
  
  if (greenCards.includes(barcode)) {

    //employyesMap.set(barcode, new employeeStatus());
  
    console.log("GREEN CARD");
    
    
    //
  }
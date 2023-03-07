

//// ######## port 1 ### Exite Door ### #### ###msa&h###

//map for staff wither inside or outside
const employyesMap = new Map(); //map for workers to determine who inside and outside

let barcode; // The code passed by the employee

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

  //console.log("your code is >>>>>>>>>>"+barcode);
  barcode = line;
  console.log(barcode);


/*   ///  /// set new employee after check 
  if(!(employyesMap.has(barcode))){
    employyesMap.set(barcode,new employeeStatus());
  }
  
  //handleEnterRequest(barcode);
  //console.log(" hi the code is "+ line   );
  //console.log(">>>" + workersMap.get(barcode));
} */
);


// handle epmloyee exit request
function handleEnterRequest(barcode) {
  
  if (greenCards.includes(barcode)) {

    //employyesMap.set(barcode, new employeeStatus());
  
    console.log("GREEN CARD");
    
    
    //
  } else if (!greenCards.includes(barcode)) {

    var objectxx=employyesMap.get(barcode) ; 
     console.log(">?>?>?>? "+ objectxx.sumOfDuration);

    var durationsxx=employyesMap.get(barcode).sumOfDuration;
    //
   //var value =workersMap.get(barcode)
//an employee can exit three tims a day and for 35 minutes in total
    if (objectxx.timesOutForSinglePrs <= 2 &&  objectxx.sumOfDuration < 35) 
    {
 
    objectxx.timesOutForSinglePrs++; 
    
    objectxx.lastExitTime=Date.now()+10;
    objectxx.lastEnterTime=Date.now();
    objectxx.lastEnterTime-
    
      durationTime =(objectxx.lastExitTime-objectxx.lastEnterTime);
    objectxx.sumOfDuration  +=durationTime ;

     // workersMap.set(barcode, [timesOutxx, durationsxx]);
      //workersMap.set(barcode, employeeStatus(timesOutxx,durationsxx));


      console.log([...employyesMap.entries()]);
      console.log("*********************************");
        }

    //
    else if (objectxx.timesOutForSinglePrs > 2 ||  objectxx.sumOfDuration  >= 50) {
      console.log("Denied exit");
    }
  }

  // List all entries

  //  let text = "";
  //  workersMap.forEach(function (value, key) {
  //    text += value + " = " + key + " | ";
  //  });
  //  console.log(  text);
}

class handleBarcodeRequest {
  // employee status
  // pass request from port/door one ..

  constructor(barcode) {
    //int barcode
    this.barcode = barcode;
  }

  //  var inGreenList =false; // list is [greencard ,task,emergency]
  //  var personsOutNumber=0;
  //  var timesOutforSinglePrs=0;
  //  var sumOfDurationOut=0;
}

var empStatus = [0];
class employeeStatus {
  constructor() {
    //this.isGreenCard=isGreenCard // not needed here.
    // this.personsOutNumber=personsOutNumber
    this.timesOutForSinglePrs = 0; //The number of times the employee exited
    this.sumOfDuration = 0;        //Total time spent out
    this.lastExitTime=0; 
    this.lastEnterTime=0;
    
  }
}

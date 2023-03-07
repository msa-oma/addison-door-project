var mysql = require("mysql");

//creating a connection to the database.
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "air-shower-door",
  //password: "yourpassword"
});
class EmployeeStatus {
  constructor(barcode) {
    this.barcode = barcode; //the employee's barcode.
    //this.Counter=0;
    this.out_stamps = []; //store get out time stamps.
    this.in_stamps = []; //store get in time stamps.
    this.TimeStamp_Out = 0; //time stamp for last time  he went out.
    this.TimeStamp_In = 0; //timestamp for last time he returned.
    this.TolatTimeSpentOut = 0; //total time spent out of the hall.
    this.IsOutside = true; //need impelmentation.
    this.Times = 0; //count how much time he went out of the hall.
  }
  SetTimeStamp_out() {
    this.TimeStamp_Out = Date.now();
    this.Times++;
    this.out_stamps[this.out_stamps.length] = this.TimeStamp_Out;
  }
  UpdateTotalTime() {
    this.TimeStamp_In = Date.now();
    if (this.Times != 0) {
      this.TolatTimeSpentOut += Math.round(
        (this.TimeStamp_In - this.TimeStamp_Out) / 1000
      );
      this.TimeStamp_Out = this.TimeStamp_In;
    }
  }
}
var myemployee = new EmployeeStatus();
myemployee.barcode = 12312;
myemployee.IsOutside = true;
myemployee.TimeStamp_Out = 123;
myemployee.TimeStamp_In = 456;
myemployee.Times = 2;
myemployee.TolatTimeSpentOut = 5;
myemployee.out_stamps=[123,123,123];
myemployee.in_stamps=[321,321,321];



function set_object(myemployee) {
  var temp_employee = new EmployeeStatus();
  temp_employee = myemployee;


  // barcodeTemp = temp_employee.barcode;
  // IsOutsideTemp = temp_employee.IsOutside;
  // TimeStamp_OutTemp = temp_employee.TimeStamp_Out;
  // TimeStamp_InTemp = temp_employee.TimeStamp_In;
  // TimesTemp = temp_employee.Times;
  // TolatTimeSpentOutTemp = temp_employee.TolatTimeSpentOut;

  var toJson = JSON.stringify(temp_employee);
  jsonObj = JSON.parse(toJson);

  console.log(jsonObj);
  const qq = 'INSERT INTO `employee-status` (`barcode`, `Timestamp Out`, `Timestamp In`, `Total Time Spent Out`, `Is Outside`, `Times`, `date`) \
   VALUES (?,?,?,?,?,?, current_timestamp())';


  var q = "SELECT * FROM `employee-status`WHERE barcode=barcodeTemp  ";
  con.connect(function (err) {
    if (err) throw err;

    con.query(qq,
      [jsonObj.barcode, jsonObj.TimeStamp_Out, jsonObj.TimeStamp_In, jsonObj.TolatTimeSpentOut, jsonObj.IsOutside, jsonObj.Times]
      , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        let resultx = Object.values(JSON.parse(JSON.stringify(result)));
        resultx.forEach((v) => console.log(v));
      });
  });

  console.log("here you go..");
}
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql =
//   "INSERT INTO `employees-log` (`barcode`, `timestamp`, `in or out`, `date`) VALUES (1058, 100000, 'in', current_timestamp())";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");

//   //a method for querying the database
//   //The query method takes an sql statements as a parameter and returns the result.
//   con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + result);
//     });
// });

/*
  // insert record into database 'when entering hall
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = 
  "INSERT INTO `employees-log` (`barcode`, `timestamp`, `in or out`, `date`) VALUES (barcode, EmployeeStatus(barcode).TimeStamp_In, 'in', current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  


  // insert record into database 'When exit the hall
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = 
    "INSERT INTO `employees-log` (`barcode`, `timestamp`, `in or out`, `date`) VALUES (barcode, EmployeeStatus(barcode).TimeStamp_Out, 'out', current_timestamp())";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
*/
// select records from database
// con.connect(function (err) {
//   if (err) throw err;
//   con.query("SELECT * FROM `employees-log`WHERE date=CURDATE()  ", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     let resultx = Object.values(JSON.parse(JSON.stringify(result)));
//     resultx.forEach((v) => console.log(v));
//   });
// });

//

////////////////////////////// EMPLOYEE-STATUS TABLE /////////////////////////////////

//INSERT INTO `employee-status` (`barcode`, `Timestamp Out`, `Timestamp In`, `Total Time Spent Out`, `Is Outside`, `Times`, `date`)
// VALUES ('1020', '4315325', '52323525', '123', '0', '2', current_timestamp());

////
//   SELECT * FROM `employee-status`WHERE date=CURDATE()

// con.connect(function (err) {
//   if (err) throw err;

//   con.query("SELECT * FROM `employee-status` WHERE date=CURDATE()  ", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     let resultx = Object.values(JSON.parse(JSON.stringify(result)));
//     resultx.forEach((v) => console.log(v));
//   });
// });

// i need insert record into table
//get this from employee map
//need class take barcode as parameter
//function to get values from map recording to the barcode
// and do the query statement

// class EmployeeSttinserting{
//   constructor(barcode){
//     this.barcode=barcode
//   }

//   checkx(barcode){
//    }
// }

set_object(myemployee);

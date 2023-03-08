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
myemployee.barcode = 4042;
myemployee.IsOutside = true;
myemployee.TimeStamp_Out = 123;
myemployee.TimeStamp_In = 123;
myemployee.Times = 2;
myemployee.TolatTimeSpentOut = 5;
myemployee.out_stamps = [123, 123, 123];
myemployee.in_stamps = [321, 321, 321];



function set_object(myemployee) {
  var temp_employee = new EmployeeStatus();
  temp_employee = myemployee;


  barcodeX = temp_employee.barcode;
  IsOutsideX = temp_employee.IsOutside;
  TimeStamp_OutX = temp_employee.TimeStamp_Out;
  TimeStamp_InX = temp_employee.TimeStamp_In;
  TimesX = temp_employee.Times;
  TolatTimeSpentOutX = temp_employee.TolatTimeSpentOut;

  // var toJson = JSON.stringify(temp_employee);
  // jsonObj = JSON.parse(toJson);

  const queryx = 'INSERT INTO `employee-status` (`barcode`, `Timestamp Out`, `Timestamp In`, `Total Time Spent Out`, `Is Outside`, `Times`,`out stamps`,`in stamps`, `date`) \
   VALUES (?,?,?,?,?,?,?,?,current_timestamp())';
  const out_stamps_x = temp_employee.out_stamps.toString();
  const in_stamps_x = temp_employee.in_stamps.toString();

  con.connect(function (err) {
    if (err) throw err;

    con.query(queryx,
      [barcodeX, TimeStamp_OutX,
        TimeStamp_InX, TolatTimeSpentOutX,
        IsOutsideX, TimesX, out_stamps_x, in_stamps_x]
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

//set_object(myemployee);


function checkIfExist(myemployee) {
  // get the query result and print it 
  //SElECT * FROM `employee-status` WHERE barcode = 'myemployee.barcode' AND date=CURDATE()
  //if(myemployee.barcode==result){continue...}
  // the select query must have barcode and currentdate conditions
  // look at this SELECT count(*) FROM commands WHERE barcode = 'myemployee.barcode' FOR EXAMPLE
  var x = new EmployeeStatus();
  x = myemployee;

  con.connect(function (err) {
    if (err) throw err;
    // work on this one
    barcodeX = x.barcode;
    IsOutsideX = x.IsOutside;
    TimeStamp_OutX = x.TimeStamp_Out;
    TimeStamp_InX = x.TimeStamp_In;
    TimesX = x.Times;
    TolatTimeSpentOutX = x.TolatTimeSpentOut;
    const out_stamps_x = x.out_stamps.toString();
    const in_stamps_x = x.in_stamps.toString();

    const insert_queryx = 'INSERT INTO `employee-status` \
  (`barcode`, `Timestamp Out`, `Timestamp In`, `Total Time Spent Out`,\
   `Is Outside`, `Times`,`out stamps`,`in stamps`, `date`) \
  VALUES (?,?,?,?,?,?,?,?,current_timestamp())';

  const del_queryx = 'DELETE FROM `employee-status` WHERE barcode= (?) AND date =CURDATE()';

    // Check if employee Exist in database   
    con.query("SELECT * FROM `employee-status` WHERE barcode= (?) AND date =CURDATE()  ", [barcodeX], function (err, result, fields) {
      if (err) throw err;
      let resultx = Object.values(JSON.parse(JSON.stringify(result)));
      resultx.forEach((v, k) => { console.log(v); });

      if (resultx.length == 1) {   //employee Exist in database 

        console.log('EMPLOYEE ALREADY EXIST :)')

        console.log(resultx.length);
        con.query(del_queryx,
          [barcodeX]
          , function (err, result, fields) {
            if (err) throw err;
             let resultx = Object.values(JSON.parse(JSON.stringify(result)));
          //  resultx.forEach((v) => console.log(v));
          });
          console.log('EMPLOYEE DELETED :(')

        con.query(insert_queryx,
          [barcodeX, TimeStamp_OutX,
            TimeStamp_InX, TolatTimeSpentOutX,
            IsOutsideX, TimesX, out_stamps_x, in_stamps_x]
          , function (err, result, fields) {
            if (err) throw err;
             let resultx = Object.values(JSON.parse(JSON.stringify(result)));
           // resultx.forEach((v) => console.log(v));
          });

          console.log('EMPLOYEE ADDED :)')



      }


      else {
        console.log('EMPLOYEE NOT EXIST :(')
        //Employee not exist
        // so insert new record "employee object 
        con.query(insert_queryx,
          [barcodeX, TimeStamp_OutX,
            TimeStamp_InX, TolatTimeSpentOutX,
            IsOutsideX, TimesX, out_stamps_x, in_stamps_x]
          , function (err, result, fields) {
            if (err) throw err;
             let resultx = Object.values(JSON.parse(JSON.stringify(result)));
            //resultx.forEach((v) => console.log(v));
          });
          console.log('EMPLOYEE ADDED :)')

      }
    });
  });


}




checkIfExist(myemployee);
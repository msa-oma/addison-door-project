//Include the serial port library
const Serialport = require("serialport");
//const Readline = require("@serialport/parser-readline");
/**********************************************************/
var events = require('events');
/*AirShower: This */
var AirShower = new events.EventEmitter();
var hd=require("./AirShower_constants");

/**********************************************************/
var HD_Rsp_Timeout;
/*AirShowerBusy :This flag is set when the air shower is waiting for the employee to enter 
  or exit.it will be reset when entring or exiting is complete.*/
  AirShower.AirShowerBusy = true;//At startup,stay busy until getmode  request received from HD.
  AirShower.mode = hd.HD_RQ.NormalMode;//'Normal'
  //AirShower.mode = hd.HD_RQ.PernamentOpen;
/**********************************************************/

var ActualEmployee = 0000;//This is the actual employee asking for exit or get in.
/**********************************************************/
//map for workers to determine who inside and outside
const EmployeesMap = new Map();

//Create the server
var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  switch (q.pathname)
  {
    case '/':
            {
              let obj = new hd.EmployeeStatus();
                // res.writeHead(200, {'Content-Type': 'text/html'});  
                // dt.send_home(res,dt.mode);
                // return res.end();
              res.writeHead(200, { 'Content-Type': 'text/html' });

              res.write('<head>                              ');
//style for table              
              res.write('<style>                             ');
              res.write('table {                             ');
              res.write('  font-family: arial, sans-serif;   ');
              res.write('  border-collapse: collapse;        ');
              res.write('  width: 100%;                      ');
              res.write('}                                   ');
              res.write('                                    ');
              res.write('td, th {                            ');
              res.write('  border: 1px solid #dddddd;        ');
              res.write('  text-align: left;                 ');
              res.write('  padding: 8px;                     ');
              res.write('}                                   ');
              res.write('                                    ');
              res.write('tr:nth-child(even) {                ');
              res.write('  background-color: #dddddd;        ');
              res.write('}                                   ');
//style for radio's
              res.write('    .tooltip { ');
              res.write('      position: relative; ');
              res.write('      display: inline-block; ');
              res.write('    } ');
              res.write(' ');
              res.write('    .tooltip .tooltiptext { ');
              res.write('      visibility: hidden; ');
              res.write('      width: 140px; ');
              res.write('      background-color: black; ');
              res.write('      color: #fff; ');
              res.write('      text-align: center; ');
              res.write('      border-radius: 8px; ');
              res.write('      padding: 5px 0; ');
              res.write(' ');
              res.write('      /* Position the tooltip */ ');
              res.write('      position: absolute; ');
              res.write('      z-index: 1; ');
              res.write('    } ');
              res.write(' ');
              res.write('    .tooltip:hover .tooltiptext { ');
              res.write('      visibility: visible; ');
              res.write('    } ');              
              res.write('</style>                            ');
              res.write('</head>                             ');
              switch(AirShower.mode)
              {
                case hd.HD_RQ.NormalMode:
                  res.write('DoorStatus: '+'Active mode'        ); 
                break;
                case hd.HD_RQ.PernamentOpen:
                  res.write('DoorStatus: '+'Idle mode'        ); 
                break;    
              }
// res.write('<br></br>'  );                 
//               res.write('Total count outside: '   );  //need implemnt.
res.write('<br>-----------------------------------</br>'  );  
res.write('</br>'  );             
              /*******************  Radio's  **************** */
              res.write('    </div> ');
              res.write('    <form > ');
              res.write(' ');
              res.write(' ');
              res.write('      <input ');
              res.write('        type="radio" ');
              res.write('        id="idle" ');
              res.write('        name="mode" ');
              res.write('        value="IDLE" ');
              res.write('        onclick ="loadDoc(0)" ');
              res.write('          ');
              if(AirShower.mode==hd.HD_RQ.PernamentOpen)
              res.write('        checked ');
              res.write('      /> ');
              res.write('      <label for="idle"> ');
              res.write('        <div class="tooltip"> ');
              res.write('          Idle mode ');
              res.write('          <span class="tooltiptext"> Always open.</span> ');
              res.write('        </div> </label ');
              res.write('      ><br /> ');
              res.write(' ');
              res.write('      <input ');
              res.write('        type="radio" ');
              res.write('        id="active" ');
              res.write('        name="mode" ');
              res.write('        value="ACTIVE" ');
              if(AirShower.mode==hd.HD_RQ.NormalMode)
              res.write('        checked ');
              res.write('        onclick="loadDoc(1)" ');
              res.write('      /> ');
              res.write('      <label for="active" ');
              res.write('        ><div class="tooltip"> ');
              res.write('          Active mode ');
              res.write('          <span class="tooltiptext"> ');
              res.write('            Recording every in/out form the Hall.</span ');
              res.write('          > ');
              res.write('        </div> </label ');
              res.write('      > ');
              res.write(' ');
              res.write('    </form> ');
              res.write(' ');
              res.write('    <script> ');
              res.write('      function loadDoc(x) { ');
              res.write('        const xhr = new XMLHttpRequest(); ');
              res.write('        if (x == 0) { ');
              res.write('          xhr.open("GET", "/Idle", true); ');
              res.write('        }else if(x==1){ ');
              res.write('            xhr.open("GET","/active",true); ');
              res.write('        }   ');
              res.write('        else  { ');
              res.write('          xhr.open("GET", "/task", true); ');
              res.write('        } ');
              res.write(' ');
              res.write('        xhr.onreadystatechange = function () { ');
              res.write('          if (this.readyState == 4 && this.status == 200) { ');
              res.write('            document.getElementById("demo").innerHTML = ');
              res.write('            alert(this.responseText); ');
              res.write('          } ');
              res.write('        }; ');
              res.write('        xhr.send(); ');
              res.write('      } ');
              res.write('    </script> ');

    /*********************  Table  ************************* */

              res.write('</br>'  );               
              res.write('<table><tr>');
              res.write('<th>Employee</th>');
              res.write('<th>Times</th>');
              res.write('<th>Total time (Sec)</th>');
              res.write('<th>Status</th>');  
              res.write('</tr><tr>');

              EmployeesMap.forEach(function (value, key) {
                obj = EmployeesMap.get(key);
                switch (obj.barcode)
                {
                case 1808:
                  res.write('<td>' + obj.barcode +'(Task)'+ '</td>');
                break;
                case 2028:
                  res.write('<td>' + obj.barcode +'(Task)'+ '</td>');
                break;
                default:
                  res.write('<td>' + obj.barcode + '</td>');    
                break;
                }
                res.write('<td>' + obj.Times + '</td>');
                res.write('<td>' + obj.TolatTimeSpentOut + '</td>');
                if(obj.IsOutside)
                res.write('<td>' + 'outside' + '</td>');  
                res.write('</tr><tr>');

              });
              res.write('</tr></table>');  
              return res.end();

            }
            //);
    break;
    case '/Idle':
                 res.write('Idle mode selected');
                 //AirShower.mode=hd.HD_RQ.PernamentOpen;
                return res.end();           
    break;
    case '/active':
                 res.write('Active mode selected');
                 //AirShower.mode==hd.HD_RQ.NormalMode;
                return res.end();           
    break;
  }

}).listen(8080);

// /**********************************************************/
// //Define the serial communication between the program and barcode scanners,
// //and the hardware (Arduino)
//Barcode scanner fixed inside the hall.
const OutPort = new Serialport('COM12', { baudRate: 9600 });
//Barcode scanner fixed outside th hall.
const InPort = new Serialport('com15', { baudRate: 9600 });
//Serial port for accessig the hardware.
const ArduinoPort = new Serialport('com14', { baudRate: 9600 });

// /**********************************************************/
// //Outport scanner detects a barcode
OutPort.on('data', function (data) {
  let barcode = Number(data);
  //Check whether this is a new barcode or it is regestered before.  
  if (!EmployeesMap.has(barcode)) {
    if(barcode!=2082)//Command barcode, not un employee barcode
    EmployeesMap.set(barcode, new hd.EmployeeStatus(barcode));//Register a new barcode
  }
  AirShower.emit('Out_req', barcode);
});
/**********************************************************/
//Inport scanner detects a barcode
InPort.on('data', function (data) {
  let barcode = Number(data);
  //Check whether this is a new barcode or it is regestered before.  
  if (!EmployeesMap.has(barcode)) {
    if(barcode!=2082)//Command barcode, not un employee barcode
    EmployeesMap.set(barcode, new hd.EmployeeStatus(barcode));//Register a new barcode
  }
  AirShower.emit('In_req', barcode);
});
/**********************************************************/
//Response from hardware.
ArduinoPort.on('data', function (data) {

  //console.log('Data:', data.length,"   ",data[0],"  ",(hd.HD_RS.ExitCompleted),"  ",Number(data)); 
  //console.log('Data:', data.length);    
  switch (String.fromCharCode(data[0])) {
    case (hd.HD_RS.ExitCompleted):
      clearTimeout(HD_Rsp_Timeout);
      AirShower.AirShowerBusy = false;
      console.log('HD:', ActualEmployee, '  Exit Completed.');
      break;
    case (hd.HD_RS.ExitFail):
      console.log('HD:', ActualEmployee, '  Exit Fail.');
      break;
    case (hd.HD_RS.EntringCompleted):
      clearTimeout(HD_Rsp_Timeout);
      (EmployeesMap.get(ActualEmployee)).UpdateTotalTime();
      AirShower.AirShowerBusy = false;
      console.log('HD:', ActualEmployee, '  Entring Completed.', '  ', (EmployeesMap.get(ActualEmployee)).TolatTimeSpentOut);
      break;
    case (hd.HD_RS.EntringFail):
      console.log('HD:', ActualEmployee, '  Entring Fail.');
      break;
    case hd.HD_RS.OutDoorLocked:
      console.log('HD:OutDoor is locked');
    break;
    case hd.HD_RS.OutDoorUnLocked:
      console.log('HD:OutDoor is unlocked');
      break;
    case hd.HD_RS.OutDoorClosed:
      console.log('HD:', ActualEmployee, ' The employee has closed the door');
      break;
    case hd.HD_RS.OutDoorOpened:
      console.log('HD:', ActualEmployee, ' The employee has opened the door');
      break;
    case hd.HD_RQ.NormalMode:
      clearTimeout(HD_Rsp_Timeout);
      console.log('HD:The Airshower enters the normal mode');
      break;
    case hd.HD_RQ.PernamentOpen:
      clearTimeout(HD_Rsp_Timeout);
      console.log('HD:The Airshower enters the permanent mode');
      break;
    case hd.HD_RS.GetMode:
      HD_Send(AirShower.mode);
      AirShower.AirShowerBusy=false;
    break;
    default:
      console.log('HD::', String.fromCharCode(data[0]));
  }
});
/**********************************************************/
function HD_Send(ValueToSend)
{
  ArduinoPort.write(ValueToSend); 
  //HD_Rsp_Timeout=setTimeout(HD_Send,500,ValueToSend);  
}
/**********************************************************/
//some body's asking for going out of the hall usig his own barcode
AirShower.on('Out_req', function (barcode) {
  switch (barcode) {
    case 2082://Exit normal mode Command barcode.
      //And enter the permanent open mode.
      if (AirShower.mode == hd.HD_RQ.PernamentOpen) {
        console.log('Already in Permanent open mode');
      }
      else {
        AirShower.AirShowerBusy = false;
        AirShower.mode = hd.HD_RQ.PernamentOpen;
        console.log('Switching to Permanent open mode.');
        HD_Send(hd.HD_RQ.PernamentOpen);
      }
      break;
    default:
      if (AirShower.mode == hd.HD_RQ.NormalMode) {
        if (!AirShower.AirShowerBusy) {

          AirShower.AirShowerBusy = true;
          console.log('Out_req:', barcode, '. Accepted request');
          console.log('Waiting for ', barcode, ' to get out the hall....');
          // if((barcode==1808)||(barcode==2028))
          // ActualEmployee=2028;
          // else
          ActualEmployee = barcode;
          (EmployeesMap.get(ActualEmployee)).SetTimeStamp_out();
          HD_Send(hd.HD_RQ.OpenForExit);
          (EmployeesMap.get(ActualEmployee)).IsOutside=true;
          //HD_Rsp_Timeout=setTimeout(Resend,300,hd.HD_RQ.OpenForExit);
        }
        else {
          console.log('Out_req:', barcode, ' Refused. AirShower\'s busy.');
        }
      }
      else {
        console.log('Out_req: Permanent Open Mode.');
        console.log('Please enter 2082 barcode to switch to normal mode.');
      }
  }
}
);
/**********************************************************/
//some body's asking for getting inside the hall usig his own barcode
AirShower.on('In_req', function (barcode) {
  switch (barcode) {
    case 2082://Exit Permanent Open mode Command barcode.
      //And enter the normal mode.
      if (AirShower.mode == hd.HD_RQ.NormalMode) {
        console.log('Already in normal mode');
      }
      else {
        //AirShower.AirShowerBusy = false;
        AirShower.mode = hd.HD_RQ.NormalMode;
        console.log('Switching to normal mode.');
        HD_Send(hd.HD_RQ.NormalMode);
      }
      break;
    default:
      if (AirShower.mode == hd.HD_RQ.NormalMode) {
        if (!AirShower.AirShowerBusy) {
          AirShower.AirShowerBusy = true;
          console.log('In_req:', barcode, '. Accepted request');
          console.log('Waiting for ', barcode, ' to get in the hall....');
          // if((barcode==1808)||(barcode==2028))
          // ActualEmployee=2028;
          // else
          ActualEmployee = barcode;
          HD_Send(hd.HD_RQ.OpenForEnter);
          (EmployeesMap.get(ActualEmployee)).IsOutside=false;
          //HD_Rsp_Timeout=setTimeout(Resend,300,hd.HD_RQ.OpenForEnter);
        }
        else {
          console.log('In_req:', barcode, ' Refused. AirShower\'s busy.');
        }
      }
      else {
        console.log('In_req: Permanent Open Mode.');
        console.log('Please go out the hall and enter 2082 barcode to switch to normal mode.');
      }
  }
}
);

 
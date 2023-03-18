var events = require('events');
/*AirShower: This */
var process = new events.EventEmitter();
var n=0;
function Func()
{
    console.log("sd");
    n++; 
    process.emit("exit");   
    if (n<8)    
    setTimeout(Func,1000);
    // else
    // clearTimeout(alive);
}

// setTimeout(function () {
//     // Listen for the 'exit' event.
//     // This is emitted when our app exits.
//     process.on("exit", function () {
//       //  Resolve the `child_process` module, and `spawn`
//       //  a new process.
//       //  The `child_process` module lets us
//       //  access OS functionalities by running any bash command.`.
//       require("child_process")
//         .spawn(
//           process.argv.shift(),
//           process.argv,
//           {
//             cwd: process.cwd(),
//             detached: true,
//             stdio: "inherit"
//           }
//         );
//     });
//     process.exit();
// }, 1000);
// process.emit("exit");
// process.exit=function(){}
setTimeout(Func,1000);

console.log("This is pid " + process.pid);
setTimeout(function () {
    process.on("exit", function () {
        require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached : true,
            stdio: "inherit"
        });
    });
    process.exit();
}, 5000);
process.exit=function(){};

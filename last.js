// const https = require("https");
// let data = "";
// const options = {
//   hostname: 'app.volight.com',
//   port: 443,
//   path: '/api/',
//   //search:'?type=attn&id=1057&target=1002',
//   search:{type: 'attn', id: '1057', target: '1002'},
//   method: 'POST',
//   headers: {
//      'Auth':'583b460b436f4e14d6bcbaf865f815d6',
//     'Content-Type': 'application/json',
//     'Content-Length':200// data.length

//   }
// }

// https
//   .request(options, resp => {
//     // log the data
//     resp.on("data", d => {
//       //process.stdout.write(d);
//        console.log(d);
//       data += d;
//     });
//     resp.on("end", () => {
//       // let url = JSON.parse(data).message;
//       // console.log(url); 
//     console.log(data);           
//     });
//   })
//   .on("error", err => {
//     console.log("Error: " + err.message);
//   });
   const yy=new Date().getFullYear();
   const mm=new Date().getMonth()+1;
   const dd=new Date().getDate();
   const ddd=new Date().getUTCDate();
      console.log(yy+'-'+mm+'-'+dd);
      console.log(ddd);
// const https = require("https");

// https
//   .get(`https://app.volight.com/api/?type=attn&id=1057&target=1002`, resp => {
//     let data = "";

//     // A chunk of data has been recieved.
//     resp.on("data", chunk => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on("end", () => {
//       let url = JSON.parse(data).message;
//       console.log(url); 
//     console.log(data);           
//     });
//   })
//   .on("error", err => {
//     console.log("Error: " + err.message);
//   });
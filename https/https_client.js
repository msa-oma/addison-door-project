const https = require("https");

https
  .get(`https://192.168.1.128:3000`, resp => {
  //.get(`https://reqres.in/api/users`, resp => {    
    let data = "";

    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      let url = JSON.parse(data).message;
      console.log(url);
       console.log(data);           
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
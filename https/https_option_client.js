const https = require("https");

const options = {
  hostname: 'https//localhost:3000',
  port: 443,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    //'Content-Length': data.length
  }
}

https
  .request(options, resp => {
    // log the data
    resp.on("data", d => {
      process.stdout.write(d);
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
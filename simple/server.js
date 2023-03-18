// var http = require('http');
// var url = require('url');


// http.createServer(function (req, res) 
// {

//   var q = url.parse(req.url, true);  
//   res.writeHead(200, {'Content-Type':'text/html'});//'application/x-www-form-urlencoded'});//application/json' });//
//   res.write(q.query.username);
//   return res.end();    
//   //res.writeHead(200, {'Content-Type': 'text/plain'});
//   //res.end(q.query.username);
// }).listen(3001);
var http = require('http');
 var url = require('url');
const PORT = 8000;

http.createServer((req, res) => {
    var q = url.parse(req.url, true);  
    console.log(q);
    var msg = req.url.split('/')[1];
    console.log('Recieved: ' + msg);
    var html = '<h3>You sent: ' + msg + '</h3>';
    //res.writeHead(200, {"Content-Type": "text/html"});
    res.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
    res.write(html);
    res.end();
    if (msg == 'end') process.exit();
}).listen(PORT, () => {
    console.log("Server listening on: %s", PORT);
});
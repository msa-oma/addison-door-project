var http = require('http');
var url = require('url');
var fs = require('fs');
var mode='Idle';
//var mode='active';
function send_home(res)
{
    res.write('<!DOCTYPE html>                                                                                        ');
res.write('<html> ');
res.write('  <style> ');
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
res.write('  </style> ');


res.write('  <body> ');
res.write('    <div id="demo"> ');
res.write('      <h1>The XMLHttpRequest Object</h1> ');
res.write(' ');
res.write('      <!-- <button type="button" onclick="loadDoc(0)">Idle mode</button> ');
res.write('<button type="button" onclick="loadDoc(1)">Active mode</button> --> ');
res.write('    </div> ');
res.write('    <form action="/action_page.php"> ');
res.write('      <p>Please select your favorite Web language:</p> ');
res.write(' ');
 
res.write(' ');
res.write('      <input ');
res.write('        type="radio" ');
res.write('        id="idle" ');
res.write('        name="mode" ');
res.write('        value="IDLE" ');
res.write('        onclick="loadDoc(0)" ');
res.write('          ');
if(mode=='Idle')
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
if(mode=='active')
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
res.write('      ><br /> ');
res.write(' ');
res.write('      <input ');
res.write('        type="radio" ');
res.write('        id="task" ');
res.write('        name="mode" ');
res.write('        value="TASK" ');
if(mode=='task')
res.write('        checked ');
res.write('        onclick="loadDoc(2)" ');
res.write('      /> ');
res.write('      <label for="task" ');
res.write('        ><div class="tooltip"> ');
res.write('          Task mode ');
res.write('          <span class="tooltiptext" ');
res.write('            >Recording every in/out form the Hall as task.</span ');
res.write('          > ');
res.write('        </div></label ');
res.write('      ><br /> ');
res.write('      <input type="submit" value="Submit" /> ');
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
res.write('  </body> ');
res.write('</html> ');
}
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  switch (q.pathname)
  {
    case '/':
            //fs.readFile("C:\\addison-door-project\\Air-shower-test\\index.html", function(err, data)
             {
                // if (err) {
                // res.writeHead(404, {'Content-Type': 'text/html'});
                // return res.end("404 Not Found");
                // } 
                res.writeHead(200, {'Content-Type': 'text/html'});
                // res.writeHead(200, {'Content-Type': 'text/html'});    
                send_home(res);
                //res.write(data);
                return res.end();
            }
            //);
    break;
    case '/Idle':
                //res.writeHead(200, {'Content-Type': 'text/html'});
                //res.writeHead(200, {'Content-Type': 'application/x-www-form-urlencoded'}); 
                 res.write('Idle mode selected');
                 mode='Idle'
                return res.end();           
    break;
    case '/active':
                //res.writeHead(200, {'Content-Type': 'text/html'});
                //res.writeHead(200, {'Content-Type': 'application/x-www-form-urlencoded'}); 
                 res.write('Active mode selected');
                 mode='active';
                return res.end();           
    break;

    case '/task':
                //res.writeHead(200, {'Content-Type': 'text/html'});
                //res.writeHead(200, {'Content-Type': 'application/x-www-form-urlencoded'}); 
                 res.write('Task mode selected');
                 mode='task';
                return res.end();           
    break;
  }

}).listen(8080);
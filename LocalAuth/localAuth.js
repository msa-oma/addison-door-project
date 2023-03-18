// THE FOLLOWING REPRESENTS A UNTESTED AND NON-PRODUCTION LEVEL
// EXAMPLE OF HOW TO SET A COOKIE SERVER SIDE WITH NODE.JS AND
// ACCESS THE DOCUMENT.COOKIES FROM THE CLIENT SIDE WHEN USING HTTPONLY

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
var dayjs = require('dayjs');

// cookieParser middleware
app.use(cookieParser());

// route for setting the cookies
app.get('/setcookie', function (req, res) {
  // setting a server side cookie with httponly
  res.cookie("uuid", crypto.randomUUID(), {
    httpOnly: true,
    expires: dayjs().add(30, "days").toDate(),
  });

  res.send(`<html><body><p>A server side cookie has been set using httpOnly.</p></body></html>`);
})

// Route for getting all the cookies
app.get('/getcookie', function (req, res) {
    res.send(`
        <html>
            <head>
                <script>
                    var uuid = '${req.cookies.uuid}';
                    alert(uuid);
                </script>
            </head>
            <body>
                <p>This is an example of how to get the cookies client side when cookie is httpOnly.</p>
            </body>
        </html>`
    );
})

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('server running on port 3000');
});
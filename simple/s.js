const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

// The secret should be an unguessable long string (you can use a password generator for this!)
const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  //const { username, password } = req.query;
  const q=req.query;
  console.log(`${q.username} is trying to login ..`);

  if (q.username === "admin" && q.password === "admin") {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
     //res.write();
     //return res.json({sss:"sss"});
    return res.json({
      token: jsonwebtoken.sign({ user: "admin" }, JWT_SECRET),
    });
  }else

  return res
    .status(401)
    .json({ message: "The username and password your provided are invalid" });
});

app.listen(3001, () => {
    console.log("API running on localhost:3001");
  });

  //curl -o doc.html https://www.w3schools.com/nodejs/shownodejs_cmd.asp
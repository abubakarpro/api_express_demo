const config = require("config");
const express = require("express");

const cors = require("cors");
const app = express();
const posts = require("./routes/posts");

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/posts", posts);

//configuration
console.log("Application name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
console.log("Mail password:" + config.get("mail.host"));

//Get
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello From First Api!!");
});

//PORT

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on Port ${port}`));

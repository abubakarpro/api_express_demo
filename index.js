const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

let posts = [
  {
    id: 1,
    title: "first post expressjs demo",
    body: "starting expressjs"
  },
  {
    id: 2,
    title: "post two related expressjs",
    body: "second step in expressjs"
  },
  {
    id: 3,
    title: "third post related expressjs",
    body: "third step in expressjs"
  }
];

//Get

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello From First Api!!");
});

//GET /posts  ====> Returns array of posts

app.get("/posts", (req, res) => {
  try {
    res.send({ status: 200, data: posts });
  } catch {
    res.send({ status: 400, error: "Not found" });
  }
});

//GET /posts/:id  ===> Returns sepecifc post object by id

app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.send({ status: 400, error: "Not found" });
  res.send({ status: 200, data: post });
});

//POST /posts [title, body]  ====> Returns newly added post object

app.post("/posts", (req, res) => {
  const schema = {
    title: Joi.string().required(),
    body: Joi.string().required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.send({ status: 404, error: result.error.details[0].message });
    // res.status(404).send(result.error.details[0].message);
    return;
  }
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    body: req.body.body
  };
  posts.push(post);
  res.send({ status: 200, data: post });
});

//PUT /posts/:id [title, body]   ====> It should update specific post's id and body

app.put("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.send({ status: 400, error: "Not found" });

  const schema = {
    title: Joi.string().required(),
    body: Joi.string().required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.send({ status: 404, error: result.error.details[0].message });
    return;
  }

  post.title = req.body.title;
  post.body = req.body.body;
  res.send({ status: 200, data: post });
});

//DELETE /posts/:id     ===> It should delete specific post by id

app.delete("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.send({ status: 400, error: "Not found" });

  const index = posts.indexOf(post);
  posts.splice(index, 1);
  res.send({ status: 200, msg: " Deleted Post" });
});

//DELETE /posts   ===> It should remove all posts

app.delete("/posts", (req, res) => {
  posts = [];
  res.send({ status: 200, msg: " All Posts Deleted" });
});

//PORT

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on Port ${port}`));

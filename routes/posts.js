const express = require("express");
const router = express.Router();
const Joi = require("joi");

let posts = [
  {
    id: 1,
    title: "1st post",
    img:
      "https://www.hostgator.com/blog/~/tmp/wp-uploads/2018/02/OptimizeBlogPosts.png",
    desc:
      "Duis aute irure dolor in reprehelum dolore eu fugiat nulla pariatur...ssdfsdfsdfsd"
  },
  {
    id: 2,
    title: "2nt post",
    img:
      "https://www.hostgator.com/blog/~/tmp/wp-uploads/2018/02/OptimizeBlogPosts.png",
    desc:
      "Duis aute irure dolor in reprehelum dolore eu fugiat nulla pariatur.....ssdfsdfsdfsd"
  },
  {
    id: 3,
    title: "3rdt post",
    img:
      "https://www.hostgator.com/blog/~/tmp/wp-uploads/2018/02/OptimizeBlogPosts.png",
    desc:
      "Duis aute irure dolor in reprehelum dolore eu fugiat nulla pariatur.,,,,ssdfsdfsdfsd"
  }
];

//GET /posts  ====> Returns array of posts

router.get("/", (req, res) => {
  //GET /posts ===> it should search posts according to given string as a query parameter
  if (req.query.query) {
    const schema = {
      query: Joi.string().required()
    };
    const result = Joi.validate(req.query, schema);
    if (result.error) {
      res.send({ status: 404, error: result.error.details[0].message });
      // res.status(404).send(result.error.details[0].message);
      return;
    }
    try {
      let query = req.query.query;
      let filteredPosts = [];
      console.log(query);
      for (let i = 0; i < posts.length; i++) {
        if (
          posts[i].title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          posts[i].desc.toLowerCase().indexOf(query.toLowerCase()) !== -1
        ) {
          filteredPosts.push(posts[i]);
        }
      }
      if (filteredPosts.length > 0) {
        res.send({ status: 200, data: filteredPosts });
      } else {
        res.send({ status: 200, error: "Not found" });
      }
    } catch {
      res.send({ status: 400, error: "Not found" });
    }
  }

  //GEt All Posts
  else {
    try {
      res.send({ status: 200, data: posts });
    } catch {
      res.send({ status: 400, error: "Not found" });
    }
  }
});

//GET /posts/:id  ===> Returns sepecifc post object by id

router.get("/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.send({ status: 400, error: "Not found" });
  res.send({ status: 200, data: post });
});

//POST /posts [title, body]  ====> Returns newly added post object

router.post("/", (req, res) => {
  const schema = {
    title: Joi.string().required(),
    img: Joi.string().required(),
    desc: Joi.string().required()
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
    img: req.body.img,
    desc: req.body.desc
  };
  posts = [...posts, { ...post }];
  //   posts.push(post);
  res.send({ status: 200, data: post });
});

//PUT /posts/:id [title, body]   ====> It should update specific post's id and body

router.put("/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.send({ status: 400, error: "Not found" });

  const schema = {
    id: Joi.number().required(),
    title: Joi.string().required(),
    img: Joi.string().required(),
    desc: Joi.string().required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.send({ status: 404, error: result.error.details[0].message });
    return;
  }

  post.title = req.body.title;
  post.img = req.body.img;
  post.desc = req.body.desc;
  res.send({ status: 200, data: post });
});

//DELETE /posts/:id     ===> It should delete specific post by id

router.delete("/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.send({ status: 400, error: "Not found" });

  const index = posts.indexOf(post);
  posts.splice(index, 1);
  res.send({ status: 200, msg: " Deleted Post" });
});

//DELETE /posts   ===> It should remove all posts

router.delete("/", (req, res) => {
  posts = [];
  res.send({ status: 200, msg: " All Posts Deleted" });
});

function validationFun(post) {
  const schema = {
    id: Joi.number().required(),
    title: Joi.string().required(),
    img: Joi.string().required(),
    desc: Joi.string().required()
  };
  return Joi.validate(post, schema);
}

module.exports = router;

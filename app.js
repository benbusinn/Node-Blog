//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is Pranav's personal blog.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var content = "";
const app = express();
const posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home",  {page: "Home", textContent: homeStartingContent, posts: posts});
});

app.get("/about", (req, res) => {
  res.render("home", {page: "About", textContent: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("home", {page: "Contact me", textContent: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/post", (req, res) => {
  res.redirect("/");
});

app.get("/posts/:title", (req, res) => {
  let title = req.params.title;
  let matched = false;
  posts.forEach(post => {
    if (title == post.title) {
      content = post.content;
      console.log(content);
      matched = true; 
    }
  });
  console.log(matched);
  res.render("post", {postTitle: title, postContent: content});
});

app.post("/", (req, res) => {
  let blogPost = req.body.blogPost;
  let blogTitle  = req.body.blogTitle;
  let post = {title: blogTitle, content: blogPost};
  posts.push(post);

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000!");
});

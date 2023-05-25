
const express = require("express")
const mongoose = require("mongoose")
var Blog = require("./models/blog")
const app = express()

// passing a promise
mongoose.connect("mongodb://127.0.0.1/blog").then(function(){ // [then] method checking connection  can also use [sinkawait method]
   console.log("database connected");
}).catch(function(error){
   console.log("database not connected"+error);
})

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true})); 

app.get("/",async function(require,response){ // fetching from the database
 var blog =  await Blog.find({})
 response.render("index", {title: "Homepage", blog:blog})
})

app.get("/blog-form", function(request,response) {
   response.render("blog_form")
})

app.post("/blog", function (request,response) { // a post middle ware
  var blog = new Blog()
  blog.author = request.body.author
  blog.content = request.body.content
  blog.contact = request.body.contact
  blog.save()
  response.redirect("/")

})

app.get("/delete/:id",async function(request,response){
   await Blog.deleteOne({id:request.params.id})

    response.redirect("/")
})

var port = 5000;

app.listen(port, function(){
   console.log("my app is running at port "+ port);
})


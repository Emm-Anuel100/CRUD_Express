
const express = require("express") // require express from node modules
const mongoose = require("mongoose")// require mongoose from node modules
var Blog = require("./models/blog") 
const app = express()

app.listen(5000, function(){ // creating a server on port 5000
   console.log("my app is running at port 5000");
})

// checking connection to the db
mongoose.connect("mongodb://127.0.0.1/blog").then(function(){ 
   console.log("database connected");
}).catch(function(error){
   console.log("database not connected"+error);
})

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true})); 

app.get("/",async function(require,response){ 
 var blog =  await Blog.find({})
 response.render("index", {title: "Homepage", blog:blog})
})

app.get("/blog-form", function(request,response) {
   response.render("blog_form")
})

app.post("/blog", function (request,response) {
  var blog = new Blog()
  blog.author = request.body.author
  blog.content = request.body.content
  blog.contact = request.body.contact
  blog.save()
  response.redirect("/")

})

app.get("/delete/:id",async function(request,response){
   await Blog.deleteOne({id:request.params.id})

    response.redirect("/") // redirect to the index page
})




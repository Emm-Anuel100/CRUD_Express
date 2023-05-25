const mongoose = require("mongoose");
var blogSchema = mongoose.Schema({
   author:{
      type: String
   },
   content:{
      type: String
   },
   contact: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now()  // the date the action was taken 
   }
})
 
var Blog = mongoose.model("Blog", blogSchema)  // [Blog] first letter must be in upper case


// Blog.create({  // inserting data to the database
//    author: "Emmanuel",
//    content: "This is my first blog",
//    contact: "08121669013"
// }).then(function(){
//    console.log("data saved succesfull");
// }).catch(function(error) {
//    console.log(error)
// })

module.exports = Blog
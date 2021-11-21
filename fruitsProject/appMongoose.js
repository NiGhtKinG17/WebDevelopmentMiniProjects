const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
  name:{
    type:String,
    required: [true,"Name not specified"]
  },
  rating: {
  type: Number,
  min: 1,
  max: 10,
},
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

// const fruit = new Fruit({
//   rating:7,
//   review:"Nice Peach Taste"
// });
//
// const pineapple = new Fruit({
//   name:"Pineapple",
//   rating:10,
//   review:"Great Taste"
// });
// const orange = new Fruit({
//   name:"Orange",
//   rating:8,
//   review:"Tangy"
// });
// const banana = new Fruit({
//   name:"Banana",
//   rating:6,
//   review:"Bad Taste"
// });

// Fruit.insertMany([pineapple,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("successfully added");
//   }
// });
//fruit.save();

Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }else{

    mongoose.connection.close();

    fruits.forEach(function(frt){
      console.log(frt.name);
    });
  }
});

// Fruit.updateOne({_id:"60954bf424780d0cf8c9cca2"},{name:"Peach"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Updated successfully");
//   }
// });

// Fruit.deleteOne({name:"Peach"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Deleted successfully");
//   }
// });
const personSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit: String
const Person = mongoose.model("Person",personSchema);

const person = new Person({
  name:"Jake",
  age:25
  favouriteFruit: pineapple;
});

person.save();

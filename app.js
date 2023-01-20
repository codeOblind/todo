//jshint esversion:6

import  express  from "express";
import bodyParser  from "body-parser";

import mongoose from "mongoose";

const app = express();

app.set('view engine', 'ejs');

import item from './model/item.js';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://namanu:namanmukul@cluster0.trbyyno.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});




var defaultItems =[
    new item({ name: "welcome" }),
    new item({ name: "press + to add item" }),
    new item({ name: "<-- to delete" })
  ];
app.get("/", async function(req, res) {
    try {
        const foundItems = await item.find({});
        if (foundItems.length === 0) {
            await item.insertMany(defaultItems);
            const foundItems = await item.find({});
            res.render("list", { ListTitle: "Today", newListItems: foundItems });
        } else {
            res.render("list", { ListTitle: "Today", newListItems: foundItems });
        }
    } catch (err) {
        console.log(err);
    }
});




app.get("/:customListName", function(req,res){
  const customListName=req.params.customListName;
  list.findOne({name: customListName},function(err,foundlist){
    if(!err){
      if(!foundList){
        const list = new List({
        name:customListName,
        items:defaultItems
      });
        list.save();
      }else{

      res.render("list", { ListTitle: foundList.name, newListItems: foundList.items });
    }
  }
});
});

app.post("/add-item", async function(req, res) {
    const newItem = new item({
        name: req.body.newItem
    });
    try {
        await newItem.save();
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});
app.post("/delete",function(req,res){
const checkedItemId =  req.body.checkbox;

item.findByIdAndRemove(checkedItemId,function(err){
  if(!err){
    console.log("sucess delete");
    res.redirect("/");
  }
});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";
import date from "./date.js"


const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req,res) =>{

    const day = date();
    res.render("list", {ListTitle: day, newListItems: items});
    
});

app.get("/work", (req,res) =>{
    res.render("list", {ListTitle: "Work List", newListItems: workItems});
});

app.get("/about", (req,res) =>{
    res.render("about");
});

app.post("/", (req,res) => {
    
    const item = req.body.newItem;

    if (req.body.submit === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else {
        items.push(item);
        res.redirect("/");
    }
});



app.listen(3000, () => console.log("Server is running on port 3000"));
require("dotenv").config();
const express = require("express");
const app = express();

require("./db/connection");

app.use(express.urlencoded({ extended:true}));

app.get("/",(req, res) =>{
    res.render("index.ejs");
});

app.listen(3000, ()=> console.log("Milo's blog is live!"))
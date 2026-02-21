require("dotenv").config();
const express = require("express");
const app = express();
const miloBlog = require("./models/miloBlog")

require("./db/connection");

app.use(express.urlencoded({ extended:true}));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

// GET /miloblog ALL BLOG PAGES

app.get("/miloBlogs", async (req, res)=>{
    try {
        const miloBlogs = await miloBlog.find();
        res.render("miloBlogPages/index.ejs", {miloBlogs});
    } catch (error) {
        res.json({err: error.message})
    }
});

// GET	/miloblog/new	New	Shows a form to create a new blog page

app.get("/miloBlogs/new", (req,res) => {
    res.render("miloBlogPages/new.ejs", { message: ""});
});

// POST	/miloBlog	Create	Creates a new plant
// GET	/miloBlog/:id	Show	Displays a specific blog by its ID
// GET	/miloBlog/:id/edit	Edit	Shows a form to edit an existing blog
// PUT	/miloBlog/:id	Update	Updates a specific blog by its ID
// DELETE	/miloBlog/:id	Destroy	Deletes a specific blog by its ID

app.listen(3000, ()=> console.log("Milo's blog is live!"))
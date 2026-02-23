require("dotenv").config();
const express = require("express");
const app = express();
const miloBlog = require("./models/miloBlog")
require("./db/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs")

app.get("/", (req,res) => {
    res.render("index");
});

// GET /miloBlog ALL BLOG PAGES

app.get("/miloBlogs", async (req, res)=>{
    try {
        const miloBlogs = await miloBlog.find();
        console.log("found from DB:", miloBlogs)
        res.render("miloBlogPages/index", {miloBlogs});
    } catch (error) {
        res.json({err: error.message})
    }
});

// GET	/miloBlog/new	New	Shows a form to create a new blog page

app.get("/miloBlogs/new", (req, res) => {
    res.render("miloBlogPages/new", { message: ""});
});

// POST	/miloBlog	Create	Creates a new blog

app.post("/miloBlogs", async (req, res)=> {
    console.log("Body Check", req.body);
    try {
        const {name, content} = req.body || {};
        if(!name || !name.trim()) {
            return res.render("miloBlogPages/new", {
                message: "Name must have a valid field",
            });
        }
        if(!content || !content.trim()) {
            return res.render("miloBlogPages/new",{
                message: "Please include content"
            })
        }
        req.body.isReadyToPost = req.body.isReadyToPost === "on";

        await miloBlog.create(req.body);
        res.redirect("/miloBlogs");
    } catch (error) {
        console.log("POST error", error);
        res.render("error.ejs", {message: error.message});
    }
});
// GET	/miloBlog/:id	Show	Displays a specific blog by its ID

app.get("/miloBlogs/:miloBlogId", async (req, res)=> {
    try {
        const foundBlog = await miloBlog.findById(req.params.miloBlogId);
        if(!foundBlog)
            throw new Error("Cannot find that Blog!");
        res.render("miloBlogPages/show", {
            miloBlog: foundBlog,
        })
    } catch (error) {
        console.log("GET error", error);
        res.status(404).json({err: error.message});
    }
});

// GET	/miloBlog/:id/edit	Edit	Shows a form to edit an existing blog

app.get("/miloBlogs/:miloBlogId/edit", async (req, res)=> {
    try {
        const editBlog = await miloBlog.findById(req.params.miloBlogId);
        if(!editBlog)
            throw Error("Cannot find that Blog!");
        res.render("miloBlogPages/edit", {
            miloBlog: editBlog,
        })
    } catch (error) {
        console.log("Edit error", error);
        res.status(404).json({err: error.message});
    }
});
// PUT	/miloBlog/:id	Update	Updates a specific blog by its ID
// DELETE	/miloBlog/:id	Destroy	Deletes a specific blog by its ID

app.listen(3000, ()=> console.log("Milo's blog is live!"))
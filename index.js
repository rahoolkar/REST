const express = require("express");
const methodOverride = require('method-override')
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(methodOverride('_method'))

let port = 8080;

let posts = [
    {
        id:uuidv4(),
        username:"rahulkar",
        content:"this is my first query"
    },
    {
        id:uuidv4(),
        username:"udayankar",
        content:"how to be an army officer"
    },
    {
        id:uuidv4(),
        username:"amritakar",
        content:"how to cook"
    }
];

app.listen(port,()=>{
    console.log("app is running on port 8080");
});

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("server is working well");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs")
})

app.post("/posts",(req,res)=>{
    let id = uuidv4(); 
    let {username,content}=req.body;
    posts.push({
        id:id,
        username:username,
        content:content
    })
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    function findPost(id){
        for(let post of posts){
            if(post.id===id){
                return post;
            }
        }
    }
    let data = findPost(id);
    res.render("post.ejs",{data});
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    function findPost(id){
        for(let post of posts){
            if(post.id===id){
                return post;
            }
        }
    }
    let data = findPost(id);
    res.render("edit.ejs",{data});
})

app.patch("/posts/:id",(req,res)=>{
    let id = req.params.id;
    function findNode(id){
        for(post of posts){
            if(post.id === id){
                return post;
            }
        }
    }
    let node = findNode(id);
    console.log(node);
    let updates = req.body.content;
    node.content = updates;
    console.log(node);
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    console.log(req.params);
    let {id} = req.params;
    posts = posts.filter((element)=>{
        return element.id != id;
    })
    res.redirect("/posts");
})
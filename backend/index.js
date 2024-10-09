import express from "express";
import { PORT , mongoURL } from "./config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { Book } from "./models/bookModels.js";

const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.post("/books" , async (req,res)=>{
    try {
        const newbook = req.body;

        if(!newbook.title || !newbook.author || !newbook.publishYear){
            res.status(400).send("<h1>please fill all the fields</h1>");
        }

        const bookResponse = await Book.create(newbook);
        return res.status(200).send(bookResponse);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
});

app.get("/books/:id" , async (req,res)=>{
    const id = req.params.id;
    try {
        const books = await Book.findById(id);
        // console.log(books);
        res.send({count : books.length , data: books});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.put("/books/:id" , async (req,res)=>{
    const id = req.params.id;
    const newbook = req.body;
    if(!newbook.title || !newbook.author || !newbook.publishYear){
        res.status(400).send("<h1>please fill all the fields</h1>");
    }

    try {
        const response = await Book.findByIdAndUpdate(id,newbook);
        if(!response)
        {
            res.status(404).send("book not found");
        }
        else
        {
            res.status(200).send(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.delete("/books/:id" , async (req,res)=>{
    const id = req.params.id;
    try {
        const response = await Book.findByIdAndDelete(id);
        if(!response)
        {
            res.status(404).send("book not found");
        }
        else
        {
            res.status(200).send(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.get("/books" , async (req,res)=>{
    try {
        const books = await Book.find({});
        console.log(books);
        res.send({count : books.length , data: books});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


app.get("/",(req,res)=>{
    res.status(200).send("<h1>hello world</h1>");
});

mongoose
    .connect(mongoURL)
    .then(()=>{
        app.listen(PORT , ()=>{
            console.log("listening on port no " + PORT);
        });
        console.log("connected to the Database");
    })
    .catch((err)=>{
        console.log(err);
    });
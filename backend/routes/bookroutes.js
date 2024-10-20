import { Book } from "../models/bookModels.js";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/" , async (req,res)=>{
    try {
        const newbook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        // console.log(req.body);
        
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

router.get("/:id" , async (req,res)=>{
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

router.put("/:id" , async (req,res)=>{
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

router.delete("/:id" , async (req,res)=>{
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

router.get("/" , async (req,res)=>{
    try {
        const books = await Book.find({});
        console.log(books);
        res.send({count : books.length , data: books});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

export default router;
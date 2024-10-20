import express from "express";
import { PORT , mongoURL } from "./config.js";
import mongoose from "mongoose";
//import bodyParser from "body-parser";
import cors from 'cors';

import booksRoute from "./routes/bookroutes.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/books" , booksRoute);

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
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
//import bodyParser from "body-parser";
import cors from 'cors';

import booksRoute from "./routes/bookroutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const mongoURL = process.env.MONGOURL;

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

export default app;
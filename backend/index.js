import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Song } from './models/songModel.js';
import songsRoute from './routes/songsRoute.js';
import cors from 'cors';



const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("Hello")
});

app.use('/songs', songsRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Yay!")
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });



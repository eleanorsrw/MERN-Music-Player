import mongoose from "mongoose";

const songSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        artist: {
            type: String,
        },
        mp3: {
            type: String,
        }
    }
);

export const Song = mongoose.model('Song', songSchema);
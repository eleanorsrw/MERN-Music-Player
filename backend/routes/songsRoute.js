import express from 'express';
import { Song } from '../models/songModel.js';
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname.replace(/\s+/g, ''));
    },
  });

const upload = multer({ storage: storage });
// Route for saving a new song (POST)
router.post('/', upload.single('file'), async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.artist
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, artist, createdAt',
            });
        }

        // creates a new song with title, artist, createdAt ONLy if prev passes
        const newSong = {
            title: request.body.title,
            artist: request.body.artist,
            mp3: request.file.filename
        };

        // actually does the creating
        const song = await Song.create(newSong);

        // sends song to client
        return response.status(201).send(song);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route to GET all songs from database
router.get('/', async (request, response) => {
    try {
        const songs = await Song.find({});
        return response.status(200).json({
            count: songs.length,
            data: songs
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route to GET one songs from database by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const song = await Song.findById(id);

        return response.status(200).json(song);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route to delete song
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Song.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: 'Song not found'});
        }
        return response.status(200).send({message: 'Song deleted!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;
const fs = require('fs');
const path = require('path');
const { shows } = require('../models/shows')
const { VIDEO_DIR } = require('../constants')

async function listAPI(req, res) {
    const show = await shows.find();
    res.json({ "shows": show }).end();
}

async function detailAPI(req, res) {
    const show = await shows.findOne({ _id: req.params.id });
    res.json({ "show ": show }).end();
}

async function streamAPI(req, res) {
    const CHUNK_SIZE = 10 ** 6;
    const range = req.headers.range;
    console.log(range);
    if (!range) {
        res.status(400).send('Must be requires Range Header');
    }
    const show = await shows.findOne({ _id: req.params.id })
    const videoPath = path.join(VIDEO_DIR, show.path);
    const videoSize = fs.statSync(videoPath).size;
    const start = (range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "content-Range": `bytes ${start}- ${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "content-Length": contentLength,
        "content-type": "video/mp4"
    }

    res.writeHead(206, headers);
    const VideoStream = fs.createReadStream(videoPath, { start, end });
    VideoStream.pipe(res);
}

module.exports = {
    listAPI,
    detailAPI,
    streamAPI,
}
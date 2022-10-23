const mongoose = require('mongoose');

const showsSchema = new mongoose.Schema({
    title: String,
    title_img: String,
    synopsis: String,
    banner: String,
    rattings: String,
    path: String,
})

const shows = mongoose.model("shows", showsSchema);

module.exports = {
    shows
}
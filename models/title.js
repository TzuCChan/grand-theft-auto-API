const mongoose = require('mongoose')

const titleSchema = new mongoose.shcema({
   name: String,
   year: Number,
   location: String,
   cityBasedOn: String,
})

moduel.exports = mongoose.model('title', titleSchema)
const {Schema, model} = require("mongoose")

const schema = new Schema ({
    message: {type: String},
    author: {type: String},
    avatar: {type: String},
    image: {type: String},
    video: {type: String},
    name: {type: String},
    tag: {type: String},
    commentsArr: [{
        author: String,
        avatar: String,
        date: Date,
        commentText: String,
    }]
})

module.exports = model("Post", schema)

const {Schema, model} = require("mongoose")

const schema = new Schema ({
    message: {type: String},
    author: {type: String},
    avatar: {type: String},
    name: {type: String},
    tag: {type: String},
})

module.exports = model("Post", schema)

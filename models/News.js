const {Schema, model} = require("mongoose")

const schema = new Schema ({
    name: {type: String},
    message: {type: String},
    banner: {type: String},
})

module.exports = model("News", schema)

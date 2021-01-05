const {Schema, model} = require("mongoose")

const schema = new Schema ({
    name: {type: String},
    des: {type: String},
    avatar: {type: String},
    tag: {type: String},
})

module.exports = model("Community", schema)

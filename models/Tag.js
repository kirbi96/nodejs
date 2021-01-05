const {Schema, model} = require("mongoose")

const schema = new Schema ({
    tag: {type: String},
    value: {type: String},
    label: {type: String},
})

module.exports = model("Tag", schema)

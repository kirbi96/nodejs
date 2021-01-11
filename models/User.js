const {Schema, model} = require("mongoose")

const schema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String},
    name: {type: String},
    status: {type: Number},
    lastName: {type: String},
    group: {type: String},
    communityId: {type: [String]},
    communityName: {type: [String]}
})

module.exports = model("User", schema)

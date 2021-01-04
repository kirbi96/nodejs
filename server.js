const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require("cors")

const PORT = config.get("port") || 3000
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use("/api/auth", require("./routes/auth.routes"))

const start = async () =>{
    try {
        await mongoose.connect(config.get("mongoUri") ,
            {
                useNewUrlParser: true,
            })
        app.listen(PORT, () => console.log("server port " + PORT))
    } catch (e) {

    }
}

start()


// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
// })
//
// const Users = mongoose.model("Users", UserSchema)
//
// app.get("/users", (req, res) => {
// Users.find()
//     .then(users => res.send(users))
//     .catch(err => res.send(err))
// })


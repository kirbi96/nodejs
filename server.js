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
app.use("/api/post", require("./routes/post.routes"))
app.use("/api/community", require("./routes/community.routes"))

//admin
app.use("/api/tag", require("./routes/tag.routes"))

const start = async () =>{
    try {
        await mongoose.connect("mongodb+srv://admin:123123123@cluster0.xvejc.mongodb.net/app?retryWrites=true&w=majority" ,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            })
        app.listen(PORT, () => console.log("server port " + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()


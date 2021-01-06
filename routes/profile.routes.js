const {Router} = require("express")
const User = require("../models/User")
const router = Router()

router.post(
    "/",
    async (req, res) =>{
        try {
            const {userId} = req.body
            User.findById(userId, (err, user) => {
                if(err){
                    console.log(err)
                } else {
                    res.status(201).json(user)
                }
            })

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

router.post(
    "/update",
    async (req, res) =>{
        try {
            const {_id, avatar, name, lastName, group, email} = req.body
            User.findById(_id, async (err, user) => {
                if(err){
                    console.log(err)
                } else {
                    user = {...user, _id, avatar, name, lastName, group, email}
                    //допилить
                    await user.save()
                    res.status(201).json(user)
                }
            })

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)



module.exports = router

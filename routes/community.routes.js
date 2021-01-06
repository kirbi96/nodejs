const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const Community = require("../models/Community")
const User = require("../models/User")
const router = Router()

router.get(
    "/",
    async (req, res) =>{
        try {
            Community.find((err, posts) => {
                if(err){
                    console.log(err)
                } else {
                    res.json(posts)
                }
            })

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

router.post(
    "/create",
    [
        check("name", "короткий текст").isLength({ min: 1 }),
        check("des", "короткий текст").isLength({ min: 1 }),
    ],
    async (req, res) =>{
        try {
            const errors = validationResult(req)
            if(errors.errors.length > 0){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные"
                })
            }

            const {name, des, tag, avatar} = req.body

            const community = new Community({name, des, tag, avatar})

            await community.save()

            res.status(201).json({ message: "Сообщество создано"})

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

router.post(
    "/subscribe",
    async (req, res) =>{
        try {
            const {communityId, userId, isSub} = req.body


            User.findById(userId, async (err, user) =>{
                if(isSub){
                    user.communityId = [communityId].concat(user.communityId)
                } else {
                    user.communityId = user.communityId.filter(item => item !== communityId)
                }
                await user.save()
                res.status(201).json({ message: "Успешно"})
            })


        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

module.exports = router

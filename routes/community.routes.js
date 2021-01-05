const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const Community = require("../models/Community")
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
            console.log(req.body)

            const {name, des, tag, avatar} = req.body

            const community = new Community({name, des, tag, avatar})

            await community.save()

            res.status(201).json({ message: "Сообщество создано"})

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

module.exports = router

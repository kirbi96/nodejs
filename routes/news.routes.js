const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const News = require("../models/News")
const router = Router()

router.get(
    "/",
    async (req, res) =>{
        try {
            News.find((err, tag) => {
                if(err){
                    console.log(err)
                } else {
                    res.json(tag)
                }
            })

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

router.get(
    "/delete/:id",
    async (req, res) =>{
        try {
            News.findByIdAndDelete(req.params.id, (err, post) =>{
                res.status(201).json({ message: "News удален"})
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
        check("message", "короткий текст").isLength({ min: 1 })
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

            const {name, message, banner} = req.body

            const news = new News({name, message, banner})

            await news.save()

            res.status(201).json({ message: "News создан"})

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

module.exports = router

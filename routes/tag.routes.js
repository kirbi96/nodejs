const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const Tag = require("../models/Tag")
const router = Router()

router.get(
    "/",
    async (req, res) =>{
        try {
            Tag.find((err, tag) => {
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
            Tag.findByIdAndDelete(req.params.id, (err, post) =>{
                res.status(201).json({ message: "Тэг удален"})
            })

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

router.post(
    "/create",
    [
        check("tag", "короткий текст").isLength({ min: 1 })
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

            const {tag} = req.body

            const tagName = new Tag({tag, value: tag, label: tag})

            await tagName.save()

            res.status(201).json({ message: "Тэг создан"})

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

module.exports = router

const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const Post = require("../models/Post")
const router = Router()

router.get(
    "/",
    async (req, res) =>{
        try {
           Post.find((err, posts) => {
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

router.get(
    "/delete/:id",
    async (req, res) =>{
        try {
            // console.log(req.params.id)
            Post.findByIdAndDelete(req.params.id, (err, post) =>{
                res.status(201).json({ message: "Пост удален"})
            })

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

router.post(
    "/create",
    [
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

            const {message, author, avatar, tag, name} = req.body

            const post = new Post({message, author, avatar, tag, name})

            await post.save()

            res.status(201).json({ message: "Пост создан"})

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

router.post(
    "/update",
    [
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

            const {id, message} = req.body

            Post.findById(id, async (err, post) =>{
                post.message = message
                await post.save()

                res.status(201).json({ message: "Пост успешно отредактирован"})
                }
            )
        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

module.exports = router

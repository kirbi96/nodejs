const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const User = require("../models/User")
const router = Router()

router.get(
    "/",
    async (req, res) =>{
        try {
            User.find((err, users) => {
                if(err){
                    console.log(err)
                } else {
                    const adminUsers = []
                    users.map(item => {
                        item.status === 1 && adminUsers.push(item)
                    })
                    // const adminUsers = users.find(i => i.status === 1)
                    res.json(adminUsers)
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
            User.findById(req.params.id, (err, user) =>{
                user.status = 0
                user.save()
                res.status(201).json({ message: "Админ удален"})
            })

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

router.post(
    "/create",
    [
        check("email", "короткий текст").isLength({ min: 1 })
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

            const {email} = req.body

            User.find((err, users) => {
                if(err){
                    console.log(err)
                } else {
                    const newAdminUser = users.find(i => i.email === email)
                    newAdminUser.status = 1
                    newAdminUser.save()
                    res.status(201).json({ message: "Админ создан"})
                }
            })

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    }
)

module.exports = router

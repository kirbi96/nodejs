const {Router} = require("express")
const bcrypt = require("bcrypt")
const config = require("../config/default.json")
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const router = Router()

router.post(
    "/register",
    [
        check("email", "Некорректный email").isEmail(),
        check("password", "Минимальная длинна пароля 6 символов").isLength({ min: 6 })
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

            const {email, password} = req.body

            const candidat = await User.findOne({ email })

            if(candidat){
                return res.status(400).json({ message: "Такой пользователь уже существует"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()

            res.status(201).json({ message: "Пользователь создан"})

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    })

router.post(
    "/login",
    [
        check("email", "Некорректный email").isEmail(),
        check("password", "Минимальная длинна пароля 6 символов").isLength({ min: 5 })
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

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if(!user){
                return res.status(400).json({message: "Пользователь не найден"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({ message: "Неверный пароль"})
            }

            const token = jwt.sign(
                { userId: user._id },
                config.jwtSecret,
                {expiresIn: "2h"}
            )
            console.log(token)

            res.json({ token, userId: user})

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так"})
        }
    })

module.exports = router

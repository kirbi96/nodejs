import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {Api} from "../../utils/api.hook";
import {AuthContext} from "../../context/AuthContext";

const Auth = () =>{
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const registerHandler = async () =>{
        try {
            await Api.post("api/auth/login", {...form}).then((res) => {
                const {token, userId} = res.data
                auth.login(token, userId)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeHandler = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    return(
        <div className="col-3 d-flex flex-column mt-4">
            <h1>Авторизация</h1>
            <div>Введите email</div>
            <input
                placeholder="email"
                name="email"
                type="email"
                onChange={changeHandler}
            />
            <div>Введите пароль</div>
            <input
                placeholder="• • • • • •"
                name="password"
                type="password"
                onChange={changeHandler}
            />
            <div>
                <Link to="/reg">
                    Регистрация
                </Link>
            </div>
            <button
                onClick={registerHandler}
                className="btn btn-primary"
            >
                Войти
            </button>

        </div>
    )
}

export default Auth

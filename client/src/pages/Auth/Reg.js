import {Link} from "react-router-dom";
import {Api} from "../../utils/api.hook";
import {useState} from "react";

const Reg = () =>{
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const registerHandler = async () =>{
        try {
            await Api.post("api/auth/register", {...form})
        } catch (e) {
            console.log(e)
        }
    }

    const changeHandler = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    return(
        <div className="col-3 d-flex flex-column mt-4">
            <h1>Регистрация</h1>
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
                <Link to="/">
                    Есть аккаунт
                </Link>
            </div>
            <button
                onClick={registerHandler}
                className="btn btn-primary"
            >
                Регистрация
            </button>

        </div>
    )
}

export default Reg

import {useAuth} from "../../../utils/auth.hook";
import {Api} from "../../../utils/api.hook";
import {useEffect, useState} from "react";


const Profile = () =>{
    const {token, refresh, userId} = useAuth()
    const [form, setForm] = useState({})
    const [showAvatar, setShowAvatar] = useState(false)

    const getProfile = () =>{
        Api.post("api/profile/", {userId: userId?._id}).then((res) => {
            setForm(res.data)
        })
    }

    const registerHandler = async () =>{
        try {
            await Api.post("api/profile/update", {...form}).then((res) => {
                refresh(token,res.data)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeHandler = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }


    useEffect(() =>{
        userId?._id && getProfile()
    },[userId?._id])

    return(
        <div className="d-flex flex-column col-6">
            <img
                style={{width: 80, height: 80, borderRadius: 20}}
                src={form.avatar}
                alt={""}
            />
            <div
                className="btn btn-primary"
                onClick={() => setShowAvatar(s => !s)}
                style={{marginTop: 10}}
            >
                {showAvatar ? "Оставить аватар" : "Изменить аватар"}
            </div>
            <input
                placeholder="Имя"
                style={{marginTop: 10}}
                value={form.name}
                name="name"
                type="text"
                onChange={changeHandler}
            />
            <input
                placeholder="Фамилия"
                style={{marginTop: 10}}
                value={form.lastName}
                name="lastName"
                type="text"
                onChange={changeHandler}
            />
            <input
                placeholder="email"
                style={{marginTop: 10}}
                value={form.email}
                readOnly={true}
                name="email"
                type="text"
                onChange={changeHandler}
            />
            <input
                placeholder="Группа"
                style={{marginTop: 10}}
                value={form.group}
                name="group"
                type="text"
                onChange={changeHandler}
            />
            {showAvatar && (
                <input
                    placeholder="Ссылка на аватар"
                    style={{marginTop: 10}}
                    value={form.avatar}
                    name="avatar"
                    type="text"
                    onChange={changeHandler}
                />
            )}
            <div onClick={registerHandler} className="btn btn-primary mt-4">
                Отправить
            </div>
        </div>
    )
}

export default Profile

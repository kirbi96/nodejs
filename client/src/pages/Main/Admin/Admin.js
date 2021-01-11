import {useEffect, useState} from "react";
import {Api} from "../../../utils/api.hook";
import DeleteSvgIcon from "../../../assets/icons/DeleteSvgIcon";
import {useAuth} from "../../../utils/auth.hook";

const Admin = () =>{
    const {userId} = useAuth()
    const [tags, setTags] = useState([])
    const [adminUsers, setAdminUsers] = useState([])
    const [form, setForm] = useState({
        tag: "",
        email: "",
    })

    const getTags = () =>{
        Api.get("api/tag/").then((res) => {
            setTags(res.data)
        })
    }
    const getAdmins = () =>{
        Api.get("api/admin/").then((res) => {
            setAdminUsers(res.data)
        })
    }

    const registerHandler = async (isAdmin) =>{
        try {
            await Api.post(isAdmin ? "api/admin/create" : "api/tag/create", {...form}).then((res) => {
                setForm({
                    tag: "",
                    email: "",
                })
                isAdmin ? getAdmins() : getTags()
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeHandler = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const deleteTags = async id =>{
        try {
            await Api.get(`api/tag/delete/${id}`, ).then((res) => {
                if(res.data){
                    getTags()
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const deleteAdmin = async id =>{
        try {
            await Api.get(`api/admin/delete/${id}`, ).then((res) => {
                if(res.data){
                    getAdmins()
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() =>{
        getTags()
        getAdmins()
    },[])

    return(
        <div className="d-flex col-12 flex-column">
            {userId?.status === 1 ? (
                <>
                    <h2>Тэги</h2>
                    <input
                        placeholder="Тэг"
                        style={{marginTop: 10}}
                        value={form.tag}
                        name="tag"
                        type="text"
                        onChange={changeHandler}
                    />
                    <button
                        onClick={() => registerHandler(false)}
                        className="btn btn-dark mt-3"
                    >
                        Создать тэг
                    </button>
                    <div className="d-flex flex-row mt-2">
                        {tags && tags.map( (item, index) =>(
                            <div className={index !== 0 ? "ml-2" : ""} style={{fontSize: 14, color: "white", backgroundColor: "black", borderRadius: 10, padding: 5}} key={index}>
                                {item.tag}
                                <span onClick={() => deleteTags(item._id)} className="ml-1" style={{fontWeight: "bold", cursor: "pointer"}}> x</span>
                            </div>
                        ))}
                    </div>
                    <h2 className="mt-5">Модерация пользователей</h2>
                    <div>Добавить администратора</div>
                    <input
                        placeholder="Почта пользователя"
                        style={{marginTop: 10}}
                        value={form.email}
                        name="email"
                        type="text"
                        onChange={changeHandler}
                    />
                    <button
                        onClick={() => registerHandler(true)}
                        className="btn btn-dark mt-3"
                    >
                        Сделать пользователя администратором
                    </button>
                    <div className="mt-4">
                        {adminUsers && adminUsers?.map( (item, index) =>(
                            <div
                                style={{border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 10, padding: 10}}
                                className="mt-2 d-flex justify-content-between"
                                key={index}
                            >
                                <div className="d-flex">
                                    <img style={{height: 40, width: 40, borderRadius: 20}} src={item.avatar} alt=""/>
                                    <div className="ml-3 h6">{item.email}</div>
                                </div>
                                <div style={{cursor: "pointer"}} onClick={() => deleteAdmin(item._id)}>
                                    <DeleteSvgIcon/>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : <span>Нет прав доступа</span>
            }

        </div>
    )
}

export default Admin

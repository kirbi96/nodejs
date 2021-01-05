import {AuthContext} from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {Api} from "../../utils/api.hook";

const Home = () =>{
    const auth = useContext(AuthContext)
    const [isUpdate, setIsUpdate] = useState(false)
    const [updateId, setUpdateId] = useState(null)
    const [posts, setPosts] = useState([])
    const [form, setForm] = useState({
        message: "",
        avatar: "https://326605.selcdn.ru/03005/iblock/340/logotip-KAI.jpg",
        author: auth?.userId?.email ,
    })

    const getPosts = () =>{
        Api.get("api/post/").then((res) => {
            setPosts(res.data)
        })
    }

    const registerHandler = async () =>{
        try {
            await Api.post("api/post/create", {...form}).then((res) => {
                getPosts()
                setForm({message: ""})
            })
        } catch (e) {
            console.log(e)
        }
    }

    const registerUpdate = async () =>{
        try {
            await Api.post("api/post/update", {...form, id: updateId}).then((res) => {
                if(res.data){
                    getPosts()
                    setForm({...form, message: ""})
                    setUpdateId(null)
                    setIsUpdate(false)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const updatePost = (id, message) =>{
        setIsUpdate(true)
        setUpdateId(id)
        setForm({...form, message: ""})
    }

    const deletePost = async id =>{
        try {
            await Api.get(`api/post/delete/${id}`, ).then((res) => {
                if(res.data){
                    getPosts()
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeHandler = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() =>{
        getPosts()
    },[])


    return(
        <div className="col-12">
            <div className="d-flex justify-content-between">
                <h1>Главная</h1>
                <div onClick={auth.logout} className="btn btn-primary">выйти</div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="d-flex col-8 flex-column mt-5">
                    {isUpdate ? (
                        <>
                            <input
                                name="message"
                                value={form.message}
                                type="text"
                                onChange={changeHandler}
                            />
                            <button
                                onClick={registerUpdate}
                                className="btn btn-primary mt-3"
                            >
                                Отредактировать
                            </button>
                        </>
                    ):(
                        <>
                            <input
                                placeholder="Что нового"
                                value={form.message}
                                name="message"
                                type="text"
                                onChange={changeHandler}
                            />
                            <button
                                onClick={registerHandler}
                                className="btn btn-primary mt-3"
                            >
                                Создать пост
                            </button>
                        </>
                    )}

                </div>
            </div>

            <div className="d-flex mt-5 justify-content-center">
                <div className="d-flex col-8 flex-column">
                    {posts && posts.map( item => (
                        <div className="d-flex justify-content-between mt-2" key={item._id}>
                            <div className="d-flex">
                                <img style={{width: 40, height: 40, borderRadius: 20, marginTop: 5}} src={item.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yJmOL8nb6x7NO2xuLB-Cc1qP2MRFdq24qg&usqp=CAU"}/>
                                <div className="ml-2">
                                    <div className="h6">{item.author}</div>
                                    <div style={{fontSize: 14, color: "gray"}}>
                                        {item.message}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => updatePost(item._id, item.message)} className="btn badge-dark mr-1">ред</button>
                                <button onClick={() => deletePost(item._id)} className="btn badge-danger">уд</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home

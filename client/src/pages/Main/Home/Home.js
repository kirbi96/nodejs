import {AuthContext} from "../../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {Api} from "../../../utils/api.hook";
import Select from "react-select";
import DeleteSvgIcon from "../../../assets/icons/DeleteSvgIcon";
import EditSvgIcon from "../../../assets/icons/EditSvgIcon";

const Home = () =>{
    const auth = useContext(AuthContext)
    const [isUpdate, setIsUpdate] = useState(false)
    const [newPost, setNewPost] = useState(false)
    const [updateId, setUpdateId] = useState(null)
    const [tags, setTags] = useState([])
    const [posts, setPosts] = useState([])
    const [form, setForm] = useState({
        message: "",
        name: "",
        tag: "",
        avatar: "https://326605.selcdn.ru/03005/iblock/340/logotip-KAI.jpg",
        author: auth?.userId?.email ,
    })

    const getPosts = () =>{
        Api.get("api/post/").then((res) => {
            setPosts(res.data)
        })
    }

    const getTags = () =>{
        Api.get("api/tag/").then((res) => {
            setTags(res.data)
        })
    }

    const registerHandler = async () =>{
        try {
            await Api.post("api/post/create", {...form}).then((res) => {
                getPosts()
                setForm({...form, message: "", name: ""})
                setNewPost( s => !s)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleInputChange = (selectedOption) => {
        setForm({...form, tag: selectedOption.tag})
    };

    const registerUpdate = async () =>{
        try {
            await Api.post("api/post/update", {...form, id: updateId}).then((res) => {
                if(res.data){
                    getPosts()
                    setForm({...form, message: "", name: ""})
                    setNewPost( s => !s)
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
        setForm({...form, message})
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
        getTags()
    },[])


    return(
        <div className="col-12">
            <div>
                {newPost ? (
                    <div className="d-flex col-12 flex-column">
                        <div onClick={() => setNewPost( s => !s)} className="btn col-3 btn-primary mb-3">
                            Закрыть создание
                        </div>
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
                                    placeholder="Название"
                                    value={form.name}
                                    name="name"
                                    type="text"
                                    onChange={changeHandler}
                                />
                                <textarea
                                    style={{marginTop: 10}}
                                    placeholder="Что нового"
                                    value={form.message}
                                    name="message"
                                    onChange={changeHandler}
                                />
                                <div style={{marginTop: 10}}>
                                    <Select
                                        onChange={handleInputChange}
                                        options={tags}
                                    />
                                </div>
                                <button
                                    onClick={registerHandler}
                                    className="btn btn-primary mt-3"
                                >
                                    Создать пост
                                </button>
                            </>
                        )}

                    </div>
                ):(
                    <div className="d-flex col-3">
                        <div onClick={() => setNewPost( s => !s)} className="btn btn-primary">
                            Создать пост
                        </div>
                    </div>
                )}

            </div>

            <div className="d-flex mt-3">
                <div className="d-flex col-12 flex-column">
                    {posts && posts.map( item => (
                        <div
                            className="mt-2"
                            key={item._id}
                            style={{border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 10, padding: 10}}
                        >
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <img style={{width: 40, height: 40, borderRadius: 20}} src={item.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yJmOL8nb6x7NO2xuLB-Cc1qP2MRFdq24qg&usqp=CAU"}/>
                                    <div className="ml-4">
                                        <div className="h6">{item.name}</div>
                                        <div style={{fontSize: 14, color: "gray"}}>
                                            {item.message}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => {}} className="btn badge-danger">Лайк</button>
                                </div>
                            </div>

                            <div className="mt-4 d-flex flex-row">
                                <div style={{fontSize: 12, color: "gray"}}>Автор {item.author}</div>
                                <div className="ml-4 d-flex">
                                    <div className="ml-1" style={{fontSize: 12, color: "white", backgroundColor: "blue", borderRadius: 10, padding: 5}}>
                                        {item.tag}
                                    </div>
                                </div>
                                <div style={{marginLeft: "auto", marginRight: 0}} className="d-flex">
                                    <div style={{cursor: "pointer"}} onClick={() => {
                                        updatePost(item._id, item.message)
                                        setNewPost(s => !s)
                                    }} >
                                        <EditSvgIcon/>
                                    </div>
                                    <div style={{cursor: "pointer"}} onClick={() => deletePost(item._id)} className="ml-2">
                                        <DeleteSvgIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home

import {AuthContext} from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {Api} from "../../utils/api.hook";
import Select from "react-select";
import {Link} from "react-router-dom";
import EditSvgIcon from "../../assets/icons/EditSvgIcon";
import DeleteSvgIcon from "../../assets/icons/DeleteSvgIcon";
import {useAuth} from "../../utils/auth.hook";

const PostCard = ({isMyLine}) =>{
    const auth = useContext(AuthContext)
    const {userId} = useAuth()
    const [isUpdate, setIsUpdate] = useState(false)
    const [newPost, setNewPost] = useState(false)
    const [updateId, setUpdateId] = useState(null)
    const [tags, setTags] = useState([])
    const [posts, setPosts] = useState([])
    const [form, setForm] = useState({
        message: "",
        name: "",
        tag: "",
        avatar: "",
        image: "",
        video: "",
        author: auth?.userId?.email,
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


    //перепилить
    const handleInputChange = (selectedOption) => {
        setForm({...form, tag: selectedOption.tag})
    };

    const registerUpdate = async () =>{
        try {
            await Api.post("api/post/update", {...form, id: updateId}).then((res) => {
                if(res.data){
                    getPosts()
                    setForm({...form, message: "", name: "", image: "", video: "", avatar: ""})
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
            {!isMyLine && userId?.status === 1 && (
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
                                    <input
                                        style={{marginTop: 10}}
                                        placeholder="Аватар"
                                        value={form.avatar}
                                        name="avatar"
                                        type="text"
                                        onChange={changeHandler}
                                    />
                                    <input
                                        style={{marginTop: 10}}
                                        placeholder="Ссылка на баннер"
                                        value={form.image}
                                        name="image"
                                        type="text"
                                        onChange={changeHandler}
                                    />
                                    <input
                                        style={{marginTop: 10}}
                                        placeholder="Ссылка на видео"
                                        value={form.video}
                                        name="video"
                                        type="text"
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
            )}

            <div className="d-flex mt-3">
                <div className="d-flex col-12 flex-column">
                    {posts && posts.map( item => (
                        <div key={item._id}>
                            {isMyLine && userId?.communityName?.find(i => i === item.tag) && (
                                <div
                                    className="mt-4"
                                    style={{border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 10, padding: 10}}
                                >
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex">
                                            <img style={{width: 40, height: 40, borderRadius: 20}} src={item.avatar}/>
                                            <div className="ml-4">
                                                <Link to={`post/${item._id}`} className="h6">{item.name}</Link>
                                                <div style={{fontSize: 14, color: "gray"}}>
                                                    {item.message.substring(0, 300)} {item.message.length > 300 ? (
                                                    <Link to={`post/${item._id}`}> ...Читать полностью</Link>
                                                ): ""}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => {}} className="btn badge-danger">Лайк</button>
                                        </div>
                                    </div>

                                    <div className="mt-4 d-flex flex-row">
                                        <div>
                                            <div style={{fontSize: 12, color: "gray"}}>Автор {item.author}</div>
                                            <div style={{fontSize: 12, color: "gray"}}>Комментариев {item.commentsArr.length}</div>
                                        </div>
                                        <div className="ml-4 d-flex">
                                            <div
                                                className="ml-1"
                                                style={{fontSize: 12, color: "white", backgroundColor: "blue", borderRadius: 10, padding: 5, maxHeight: 30}}
                                            >
                                                {item.tag}
                                            </div>
                                        </div>
                                        {userId?.status === 1 && (
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
                                        )}
                                    </div>
                                </div>
                            )}
                            {!isMyLine && (
                                <div
                                    className="mt-4"
                                    style={{border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 10, padding: 10}}
                                >
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex">
                                            <img style={{width: 40, height: 40, borderRadius: 20}} src={item.avatar}/>
                                            <div className="ml-4">
                                                <Link to={`post/${item._id}`} className="h6">{item.name}</Link>
                                                <div style={{fontSize: 14, color: "gray"}}>
                                                    {item.message.substring(0, 300)} {item.message.length > 300 ? (
                                                    <Link to={`post/${item._id}`}> ...Читать полностью</Link>
                                                ): ""}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => {}} className="btn badge-danger">Лайк</button>
                                        </div>
                                    </div>

                                    <div className="mt-4 d-flex flex-row">
                                        <div>
                                            <div style={{fontSize: 12, color: "gray"}}>Автор {item.author}</div>
                                            <div style={{fontSize: 12, color: "gray"}}>Комментариев {item.commentsArr.length}</div>
                                        </div>
                                        <div className="ml-4 d-flex">
                                            <div
                                                className="ml-1"
                                                style={{fontSize: 12, color: "white", backgroundColor: "blue", borderRadius: 10, padding: 5, maxHeight: 30}}
                                            >
                                                {item.tag}
                                            </div>
                                        </div>
                                        {userId?.status === 1 && (
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
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default PostCard

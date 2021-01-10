import {Api} from "../../../utils/api.hook";
import {useEffect, useState} from "react";
import Select from "react-select";
import {useAuth} from "../../../utils/auth.hook";


const Community = () =>{
    const {token, refresh, userId} = useAuth()
    const [newPublic, setNewPublic] = useState(false)
    const [community, setCommunity] = useState([])
    const [tags, setTags] = useState([])
    const [form, setForm] = useState({
        name: "",
        des: "",
        tag: "",
        avatar: "",
    })

    const getCommunity = () =>{
        Api.get("api/community/").then((res) => {
            setCommunity(res.data)
        })
    }

    const getTags = () =>{
        Api.get("api/tag/").then((res) => {
            setTags(res.data)
        })
    }

    const getProfile = () =>{
        Api.post("api/profile/", {userId: userId?._id}).then((res) => {
            refresh(token,res.data)
        })
    }

    const subscribe = (id, name, isSub) =>{
        Api.post("api/community/subscribe", {communityId: id, communityName: name, userId: userId?._id, isSub}).then((res) => {
            getProfile()
        })
    }

    const handleInputChange = (selectedOption) => {
        setForm({...form, tag: selectedOption.tag})
    };

    const registerHandler = async () =>{
        try {
            await Api.post("api/community/create", {...form}).then((res) => {
                setForm({
                    name: "",
                    des: "",
                    avatar: "",
                })
                getCommunity()
                setNewPublic(false)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeHandler = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() =>{
        getCommunity()
        getTags()
    },[])

    return(
        <div className="pb-5">
            {newPublic ? (
                <div className="d-flex col-12 flex-column">
                    <div onClick={() => setNewPublic( s => !s)} className="col-4 btn btn-primary">
                        Закрыть админ панель
                    </div>
                    <input
                        placeholder="Название"
                        style={{marginTop: 10}}
                        value={form.name}
                        name="name"
                        type="text"
                        onChange={changeHandler}
                    />
                    <input
                        placeholder="Описание"
                        style={{marginTop: 10}}
                        value={form.des}
                        name="des"
                        type="text"
                        onChange={changeHandler}
                    />
                    <input
                        placeholder="Ссылка на баннер"
                        style={{marginTop: 10}}
                        value={form.avatar}
                        name="avatar"
                        type="text"
                        onChange={changeHandler}
                    />
                    <div style={{marginTop: 10}}>
                        <Select
                            closeMenuOnSelect={false}
                            onSelectResetsInput={false}
                            onBlurResetsInput={false}
                            onChange={handleInputChange}
                            // isMulti при желании множественный выбор
                            options={tags}
                        />
                    </div>
                    <button
                        onClick={registerHandler}
                        className="btn btn-primary mt-3"
                    >
                        Создать сообщество
                    </button>
                </div>

            ) : (
                <div onClick={() => setNewPublic( s => !s)} className="btn btn-primary">
                    Создать сообщество
                </div>
            )}
            {community && community.map( (community, index) => (
                <div key={index} className="col-12 mt-4" style={{border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 10, padding: 20}}>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="d-flex">
                            <img
                                style={{width: 80, height: 80, borderRadius: 20}}
                                src={community.avatar}
                            />
                            <div className="ml-4">
                                <div className="h6">{community.name}</div>
                                <div style={{fontSize: 14, color: "gray"}}>
                                    {community.des}
                                </div>
                                <div className="d-flex mt-2">
                                    <div className="ml-1" style={{fontSize: 10, color: "white", backgroundColor: "blue", borderRadius: 10, padding: 5}}>
                                        {community.tag}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {userId?.communityId?.find(item => item === community._id) ? (
                                <button onClick={() => subscribe(community._id, community.tag, false)} className="btn badge-dark mr-1">
                                    Отписаться
                                </button>
                            ):(
                                <button onClick={() => subscribe(community._id, community.tag, true)} className="btn badge-dark mr-1">
                                    Подписаться
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Community

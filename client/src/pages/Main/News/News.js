import {useEffect, useState} from "react";
import {Api} from "../../../utils/api.hook";
import DeleteSvgIcon from "../../../assets/icons/DeleteSvgIcon";


const News = () => {
    const [newNews, setNewNews] = useState(false)
    const [news, setNews] = useState([])
    const [form, setForm] = useState({
        name: "",
        message: "",
        banner: ""
    })

    const getNews = () =>{
        Api.get("api/news/").then((res) => {
            setNews(res.data)
        })
    }

    const deleteNews = async id =>{
        try {
            await Api.get(`api/news/delete/${id}`, ).then((res) => {
                getNews()
            })
        } catch (e) {
            console.log(e)
        }
    }

    const registerHandler = async () =>{
        try {
            await Api.post("api/news/create", {...form}).then((res) => {
                setForm({
                    name: "",
                    message: "",
                    banner: "",
                })
                getNews()
                setNewNews(false)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeHandler = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() =>{
        getNews()
    },[])


    return(
        <div className="d-flex col-12 flex-column">
            {newNews ? (
                <div className="d-flex col-12 flex-column">
                    <div onClick={() => setNewNews( s => !s)} className="col-4 btn btn-primary">
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
                    <textarea
                        placeholder="Описание"
                        style={{marginTop: 10}}
                        value={form.message}
                        name="message"
                        onChange={changeHandler}
                    />
                    <input
                        placeholder="Ссылка на баннер"
                        style={{marginTop: 10}}
                        value={form.banner}
                        name="banner"
                        type="text"
                        onChange={changeHandler}
                    />
                    <button
                        onClick={registerHandler}
                        className="btn btn-primary mt-3"
                    >
                        Создать новость
                    </button>
                </div>
            )  : (
                <div onClick={() => setNewNews( s => !s)} className="btn btn-primary">
                    Создать новость
                </div>
            )}
            {news && news.map( (item, index) => (
                <div key={index} className="col-12 mt-4" style={{border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 10, padding: 20}}>
                    <div className="mt-2">
                        <div className="h6">{item.name}</div>
                        <div style={{fontSize: 14, color: "gray"}}>
                            {item.message}
                        </div>
                        <img
                            style={{width: "100%", height: 300, marginTop: 30, borderRadius: 20}}
                            src={item.banner}
                        />
                        <div className="mt-3 d-flex justify-content-end">
                            <div style={{cursor: "pointer"}} onClick={() => deleteNews(item._id)} className="ml-2">
                                <DeleteSvgIcon/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default News

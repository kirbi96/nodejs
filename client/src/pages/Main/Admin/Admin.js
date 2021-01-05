import {useEffect, useState} from "react";
import {Api} from "../../../utils/api.hook";

const Admin = () =>{
    const [tags, setTags] = useState([])
    const [form, setForm] = useState({
        tag: "",
    })

    const getTags = () =>{
        Api.get("api/tag/").then((res) => {
            setTags(res.data)
        })
    }

    const registerHandler = async () =>{
        try {
            await Api.post("api/tag/create", {...form}).then((res) => {
                setForm({
                    tag: "",
                })
                getTags()
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

    useEffect(() =>{
        getTags()
    },[])

    return(
        <div className="d-flex col-12 flex-column">
            <h2>Тэги</h2>
            <input
                placeholder="Тэг"
                style={{marginTop: 10}}
                value={form.name}
                name="tag"
                type="text"
                onChange={changeHandler}
            />
            <button
                onClick={registerHandler}
                className="btn btn-primary mt-3"
            >
                Создать тэг
            </button>
            <div className="d-flex flex-row mt-2">
                {tags && tags.map( (item, index) =>(
                    <div className={index !== 0 ? "ml-2" : ""} style={{fontSize: 14, color: "white", backgroundColor: "blue", borderRadius: 10, padding: 5}} key={index}>
                        {item.tag}
                        <span onClick={() => deleteTags(item._id)} className="ml-1" style={{fontWeight: "bold", cursor: "pointer"}}> x</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Admin

import {NavLink} from "react-router-dom";

const styleTag = {
    color: "black"
}

const styleActiveTag = {
    color: "red", fontWeight: 600
}

const Menu = () =>{
    return(
        <div className="d-flex flex-column">
            <NavLink exact style={styleTag} activeStyle={styleActiveTag} to="/">Главная</NavLink>
            <NavLink style={styleTag} activeStyle={styleActiveTag} className="mt-1" to="/community">Сообщества</NavLink>
            <NavLink style={styleTag} activeStyle={styleActiveTag} className="mt-1" to="/postsline">Моя лента</NavLink>
            <NavLink style={styleTag} activeStyle={styleActiveTag} className="mt-1" to="/news">Новости</NavLink>
            <NavLink style={styleTag} activeStyle={styleActiveTag} className="mt-1" to="/profile">Профиль</NavLink>

            <div style={{fontSize: 12, color: "gray"}} className="mt-3">Панель администратора</div>
            <NavLink style={styleTag} activeStyle={styleActiveTag} className="mt-1" to="/admin">Админ панель</NavLink>
        </div>
    )

}

export default Menu

import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";

const Home = () =>{
    const auth = useContext(AuthContext)
    return(
        <div>
            <h1>Главная</h1>
            <div onClick={auth.logout} className="btn-primary">выйти</div>
        </div>
    )
}

export default Home

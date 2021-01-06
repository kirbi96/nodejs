import {Switch, Route, Redirect} from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Reg from "./pages/Auth/Reg";
import Home from "./pages/Main/Home/Home";
import Community from "./pages/Main/Community/Community";
import Menu from "./components/Menu/Menu";
import Admin from "./pages/Main/Admin/Admin";
import {useAuth} from "./utils/auth.hook";
import News from "./pages/Main/News/News";
import PostsLine from "./pages/Main/PostsLine/PostsLine";
import Profile from "./pages/Main/Profile/Profile";

const useRoutes = isAuth =>{
    const {logout} = useAuth()
    if(!isAuth){
        return (
            <Switch>
                <Route path="/reg" component={Reg} />
                <Route path="/" component={Auth}/>
                <Redirect to="/"/>
            </Switch>
        )
    } else {
        return (

            <div>
                <div className="d-flex justify-content-between">
                    {/*<h1>Форум КАИ</h1>*/}
                    <img style={{width: 200, height: 70}} src="https://kai.ru/documents/10181/11482468/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF+%D0%B2+%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B5+jpg/d56a657b-f649-496c-8a85-6adb5789926e?t=1596018179930"/>
                    <div style={{maxHeight: 40, marginTop: 10}} onClick={logout} className="btn btn-primary">Выйти</div>
                </div>
                <div className="d-flex mt-5">
                    <div className="col-3">
                        <Menu/>
                    </div>
                    <div className="col-9">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/postsline" component={PostsLine}/>
                            <Route path="/community" component={Community}/>
                            <Route path="/profile" component={Profile}/>
                            <Route path="/news" component={News}/>
                            <Route exact path="/admin" component={Admin}/>
                            {/*<Redirect to="/"/>*/}
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default useRoutes

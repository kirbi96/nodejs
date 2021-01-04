import {Switch, Route, Redirect} from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Reg from "./pages/Auth/Reg";
import Home from "./pages/Home/Home";

const useRoutes = isAuth =>{
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
            <Switch>
                <Route path="/" component={Home}/>
                <Redirect to="/"/>
            </Switch>
        )
    }
}

export default useRoutes

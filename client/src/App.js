import useRoutes from "./routes"
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./utils/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, userId, login, logout} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)
  return (
      <AuthContext.Provider value={{
          token, login, logout, userId, isAuth
      }}>
          <BrowserRouter>
              <div className="d-flex justify-content-center">
                  {routes}
              </div>
          </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;

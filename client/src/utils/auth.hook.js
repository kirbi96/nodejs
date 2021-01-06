import {useCallback, useEffect, useState} from "react";

const storageName = "userData"

export const useAuth = () =>{
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const refresh = useCallback(() =>{

    }, [])

    const login = useCallback((jwtToken, id) =>{
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id}))
    }, [])
    const logout = useCallback(() =>{
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
        window.location.reload()
    }, [])

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){
            login(data.token, data.userId)
        }
    }, [login, refresh])

    return {login, logout, refresh, token, userId}
}

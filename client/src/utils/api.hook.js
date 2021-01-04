import {useCallback, useState} from "react";
import axios from "axios"

const baseUrl = "http://localhost:3000/"

export const Api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
})


// export const Api = () =>{
//
//     // const [loading, setLoading] = useState(false)
//     // const [error, setError] = useState(false)
//     //
//     // const request = useCallback(async (url, method = "GET", body = null, headers = {"Content-Type": "application/json"}) =>{
//     //     setLoading(true)
//     //     try {
//     //         const res = await fetch( url, {method, body, headers})
//     //         const data = await res.json()
//     //         console.log(res)
//     //         if(!res.ok){
//     //             throw new Error(data.message || "Что то пошло не так")
//     //         }
//     //
//     //         setLoading(false)
//     //
//     //         return data
//     //     } catch (e) {
//     //         setLoading(false)
//     //         setError(e.message)
//     //         throw e
//     //     }
//     // }, [])
//     //
//     // const clearError = () => setError(null)
//     //
//     // return {loading, error, request, clearError}
// }

import axios from "axios"

const baseUrl = "http://localhost:3000/"

export const Api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
})

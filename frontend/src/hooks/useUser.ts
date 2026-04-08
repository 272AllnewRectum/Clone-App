import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

export const login = (data: {email: string, password:string}) => 
    api.post("/login", data);

export const register = (data:{ name: string, email:string, password:string}) => 
    api.post("/users", data);

export default api;
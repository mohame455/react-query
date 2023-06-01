import axios from 'axios'

export const getUser=(id)=>{
    return axios.get(`http://localhost:3000/users/${id}`).then(res=>res.data)
}
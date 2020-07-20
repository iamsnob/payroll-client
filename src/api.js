import axios from 'axios';

export default ()=>{
    //let token = window.localStorage.CurrentUser;
    return axios.create({
        baseURL:'api/',
        headers:{
            Accept:"application/json",
            "Content-Type": 'application/json',
            // "auth-token":token
        }
    })
}
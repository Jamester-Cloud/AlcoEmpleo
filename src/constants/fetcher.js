import axios from "axios"

export  const fetcherGet = url => axios.get(url).then(res => res.data)

export const fetcherPost = (url, params) => axios.post(url, params).then(res => res.data)
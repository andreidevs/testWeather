import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//API KEY FROM OPEN WEATHER
instance.defaults.params = {}
instance.defaults.params['appid'] =  import.meta.env.VITE_APP_API_KEY


export default instance

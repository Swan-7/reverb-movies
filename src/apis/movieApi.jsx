import axios from "axios";

//base url to make requests to the movie database
const url = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default url;
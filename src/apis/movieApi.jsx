import axios from "axios";

const url = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});


export const apiConfig = {
  baseURL: "https://api.themoviedb.org/3",
  apiKey: "3d311729ed74f6c72cd6281e499e7487",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/originial/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default url;
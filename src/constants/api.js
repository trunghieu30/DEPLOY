import axios from "axios";

const TokenCybersoft =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY";
const baseURL = `https://movienew.cybersoft.edu.vn/api/`;
export const api = axios.create();
api.interceptors.request.use((config) => {
    let token = "";
    if (localStorage.getItem("ACCESS_TOKEN")) {
        token = "Bearer " + localStorage.getItem("ACCESS_TOKEN").replaceAll('"', '');
    }
    const _config = {
        ...config,
        headers: {
            Authorization: token,
            TokenCybersoft,
        },
        baseURL,
    };
    return _config;
});

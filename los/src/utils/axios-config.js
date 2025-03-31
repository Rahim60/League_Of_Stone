import axios from "axios";
import API_URL from "./constants";

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
    (config) => {
        const excludedPaths = [`/users`, `/login`, `/cards`];
        const isExcluded = excludedPaths.some((path) => config.url.includes(path));

        if (!isExcluded) {
            const token = sessionStorage.getItem("token");
            if (token) config.headers["WWW-Authenticate"] = token;
        }

        return config;
    }, (error) => (Promise.reject(error))
)
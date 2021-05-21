import axios from "axios";
const baseUrl = "http://localhost:8080";
//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {
        // config.headers['Content-Type'] = 'application/json'
        // config.headers['Access-Control-Allow-Origin'] = '*'
        config.validateStatus = function (status) {
            return status >= 200 && status < 500
        }
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["x-access-token"] = accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return axios
                .post(`${baseUrl}/refresh_token`)
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("accessToken", res.data.accessToken);
                        console.log("Access token refreshed!");
                        return axios(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

axios.defaults.withCredentials = true;
//functions to make api calls
const api = {
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    register: (body) => {
        return axios.post(`${baseUrl}/register`, body);
    },
    login: (body) => {
        return axios.post(`${baseUrl}/login`, body);
    },
    refreshToken: () => {
        return axios.post(`${baseUrl}/refresh-token`);
    },
    logout: () => {
        return axios.post(`${baseUrl}/logout`);
    },
    getlistprovince: () => {
        return axios.get(`${baseUrl}/listprovince`)
    },
    getlistdistrict: (body) => {
        return axios.post(`${baseUrl}/listdistrict`, body)
    },
    getlistward: (body) => {
        return axios.post(`${baseUrl}/listward`, body)
    },
    getnumberuser: (body) => {
        return axios.get(`${baseUrl}/numberuser`, body)
    },
    getnumberroom: (body) => {
        return axios.get(`${baseUrl}/numberroom`, body)
    },
    getnumberreport: (body) => {
        return axios.get(`${baseUrl}/numberreport`, body)
    },
    getnumberreport_: (body) => {
        return axios.get(`${baseUrl}/numberreport_`, body)
    },
    getnumberpostreported: (body) => {
        return axios.get(`${baseUrl}/numberpostreported`, body)
    },
    getstatisticreport: (body) => {
        return axios.get(`${baseUrl}/statisticreport`, body)
    },
    getstatisticuser: (body) => {
        return axios.get(`${baseUrl}/statisticuser`, body)
    },
    getstatisticroom: (body) => {
        return axios.get(`${baseUrl}/statisticroom`, body)
    },
    getnumberpost: (body) => {
        return axios.get(`${baseUrl}/getnumberpost`, body)
    },
    createhouse: (body) => {
        return axios.post(`${baseUrl}/createhouse`, body, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },

    getlistroom: (data) => {
        return axios.get(`${baseUrl}/listroom?page=${data.page}&price=${data.price}&size=${data.size}&category=${data.category}&ordertype=${data.ordertype}&order=${data.order}&province=${data.province}&district=${data.district}&ward=${data.ward}`)
    },
    getallroom: (page) => {
        return axios.get(`${baseUrl}/allroom?page=${page}`);
    },
    getlisthouse: (page) => {
        return axios.get(`${baseUrl}/listhouse?page=${page}`);
    },
    gethouse: (houseId) =>{
        return axios.get(`${baseUrl}/gethouse?houseId=${houseId}`);
    },
    edithouse: (data) => {
        return axios.post(`${baseUrl}/edithouse`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },
    deletehouse: (houseId) => {
        return axios.delete(`${baseUrl}/deletehouse?houseId=${houseId}`);
    },
    getlisthouseroom: (houseId, page)=>{
        return axios.get(`${baseUrl}/listhouseroom?houseId=${houseId}&page=${page}`);
    },
    createroom: (body)=>{
        return axios.post(`${baseUrl}/createroom`, body, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },
    getroom: (roomId)=>{
        return axios.get(`${baseUrl}/getroom?roomId=${roomId}`);
    } ,
    editroom: (body)=>{
        return axios.post(`${baseUrl}/editroom`, body, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },
    deletehouseroom: (houseId, roomId) => {
        return axios.delete(`${baseUrl}/deletehouseroom?houseId=${houseId}&roomId=${roomId}`);
    },
}

export default api;
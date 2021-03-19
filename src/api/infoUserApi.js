import axiosClient from "./axiosClient";

const infoUserApi = {
    getAll(params){
        const url = 'api/0.4/?randomapi';
        return axiosClient.get(url, {params})
    },
};

export default infoUserApi;

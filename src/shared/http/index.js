import axios from "axios"

const http = {
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params
        });
    },
}

export default http
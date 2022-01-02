import axios from 'axios';

function customAxios(url, callback) {
    axios(
        {
            url: '/api' + url,
            method: 'post',
            baseURL: 'http://localhost:8080',
            withCredentials: true,
        }
    ).then(response => {
        callback(response.data);
    });
}

export default customAxios;
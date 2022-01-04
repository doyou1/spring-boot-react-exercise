import axios from 'axios';

function login (url, data, callback) {
    axios(
        {
            url: '/api' + url,
            method: 'post',
            headers : {
                'Content-Type': 'application/json',
            },
            baseURL: 'http://localhost:8080',
            data: JSON.stringify(data),
            withCredentials: true,
        }
    ).then(response => {
        callback(response.data);
    });
};

function join(url, data, callback) {
    axios(
        {
            url: '/api' + url,
            method: 'post',
            headers : {
                'Content-Type': 'application/json',
            },
            baseURL: 'http://localhost:8080',
            data: JSON.stringify(data),
            withCredentials: true,
        }
    ).then(response => {
        callback(response.data);
    });
};

function currentUser(url, callback) {
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

export {login, join, currentUser};
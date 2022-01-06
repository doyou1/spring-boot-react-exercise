import axios from 'axios';

function login (data, callback) {
    axios(
        {
            url: '/api/login',
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

function logout(callback) {
    axios(
        {
            url: '/api/logout/',
            method: 'get',
            baseURL: 'http://localhost:8080',
            withCredentials: true,
        }
    ).then(response => {
        callback(response.data);
    });
}

function join(data, callback) {
    axios(
        {
            url: '/api/join',
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

async function currentUser() {
    const response = await axios(
        {
            url: '/api/currentUser',
            method: 'post',
            baseURL: 'http://localhost:8080',
            withCredentials: true,
        }
    );
    return response.data;
}

async function getMessage(_id) {
    const response = await axios(
        {
            url: '/api/getMessage/',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: _id,
            baseURL: 'http://localhost:8080',
            withCredentials: true,
        }
    );
    return response.data;
}
async function treeLink(_id) {
    const response = await axios(
        {
            url: '/api/treeLink/',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: _id,
            baseURL: 'http://localhost:8080',
            withCredentials: true,
        }
    );

    return response.data;
}

function send(data, callback) {
    axios(
        {
            url: '/api/send/',
            method: 'post',
            headers : {
                'Content-Type': 'application/json',
            },
            data: data,
            baseURL: 'http://localhost:8080',
            withCredentials: true,
        }
    ).then(response => {
        callback(response.data);
    });
}

export {login, logout, join, currentUser, getMessage, treeLink, send};
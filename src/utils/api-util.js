const API_ENDPOINT = "";
const TOKEN_API = "/api/v1/Token";
const ANALYTICS_API = "/api/v1/Analytics";
const DATA_API = "/api/v1/Data";

export function analytics(data) {
    fetch(API_ENDPOINT + ANALYTICS_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
export function getData(type, callback) {
    fetch(API_ENDPOINT + DATA_API + '?' + new URLSearchParams({
        uuid: localStorage.getItem('uuid'),
        type: type,
    }), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(data => callback(data, null))
        .catch(error => callback(null, error));
}
export function putToken(callback) {
    fetch(API_ENDPOINT +TOKEN_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: localStorage.getItem('uuid'), name: localStorage.getItem('name') })
    })
        .then(response => response.json())
        .then(data => callback(data, null))
        .catch(error => callback(null, error));
}
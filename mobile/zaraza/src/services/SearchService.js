import {systemConfig} from '../config/AppConfig'


function postRequest(url, data) {
    return fetch(url, {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    })
}

function sendRequest(url, params) {
    var url_obj = new URL(url);
    Object.keys(params).forEach(key => url_obj.searchParams.append(key, params[key]))
    return fetch(url_obj).then(response => response.json())
}


export async function setTemperature(hash, temperature) {
    console.log("web::setTemperature:", {hash, temperature});
    return postRequest(systemConfig.getWebUrl() + '/temperature/', {hash: hash, temperature: temperature})
        .then(x => {
            console.log("web::setTemperature returned:", x);
            return x
        });
}


export async function getImage(hash, temperature) {
    console.log("web::getImage:", {hash, temperature});
    return sendRequest(systemConfig.getWebUrl() + '/temperature/', {hash, temperature})
        .then(x => {
            console.log("web::getImage returned:", x);
            return x
        });
}


export function search(query) {
    console.log("web::search:", {query});
    return sendRequest(systemConfig.getWebUrl() + '/citizens/details/', {query})
        .then(x => {
            console.log("web::search:", x);
            return x
        });
}




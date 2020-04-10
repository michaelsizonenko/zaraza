import { systemConfig } from '../config/AppConfig'



function sendRequest (url, data,method='GET') {
  return fetch(url, {
//    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json())
}

function  postRequest(url, data) {
  return sendRequest(url, data,'POST')
}

export async function  setTemperature(hash, temperature) {
  console.log("web::setTemperature:", { hash, temperature });
  return postRequest(ystemConfig.getWebUrl() + '/temperature/', { hash: hash, temperature: temperature })
    .then(x => {
      console.log("web::setTemperature returned:", x);
      return x
    });
}


export async function  getImage(hash, temperature) {
  console.log("web::getImage:", { hash, temperature });
  return sendRequest(ystemConfig.getWebUrl() + '/temperature/', { hash,  temperature })
    .then(x => {
      console.log("web::getImage returned:", x);
      return x
    });
}


export async function  search(query) {
  console.log("web::search:", { hash, temperature });
  return sendRequest(ystemConfig.getWebUrl() + '/temperature/', { query })
    .then(x => {
      console.log("web::search:", x);
      return x
    });
}




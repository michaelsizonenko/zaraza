import config from './config';

export let isLocalhost = false;

export function toggleConfig() {
    console.log("Config has changed.");
    isLocalhost = !isLocalhost;
}

export function getWebUrl () {
    console.log("Get web URL. Is localhost : ", isLocalhost);
    let configuration = isLocalhost?config.localhost:config.development;
    return `${configuration.webProtocol}://${configuration.server}:${configuration.httpPort}`;
}

export function getWampUrl () {
    let configuration = isLocalhost?config.localhost:config.development;
    return `${configuration.wampProtocol}://${configuration.server}:${configuration.httpPort}`;
}
import config from './config';

export let isLocalhost = true;

export function toggleConfig() {
    isLocalhost = !isLocalhost;
}

export function getWebUrl () {
    let configuration = isLocalhost?config.localhost:config.development;
    return `${configuration.webProtocol}://${configuration.server}:${configuration.httpPort}`;
}

export function getWampUrl () {
    let configuration = isLocalhost?config.localhost:config.development;
    return `${configuration.wampProtocol}://${configuration.server}:${configuration.httpPort}`;
}
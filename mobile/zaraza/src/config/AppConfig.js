import config from './config';


class ConfigController {

    static _instance :ConfigController = null;
    isLocalhost = false;
    language = 'ua';

    setLanguage = (language) => {
        this.language = language;
    };

    getLanguage = (language) => {
        return this.language;
    };

    constructor() {

    }

    static getInstance() {
        if (ConfigController._instance == null) {
            ConfigController._instance = new ConfigController();
        }

        return this._instance;
    }

    getWebUrl = () => {
        console.log("Get web URL. Is localhost : ", this.isLocalhost);
        let configuration = this.isLocalhost?config.localhost:config.development;
        return `${configuration.webProtocol}://${configuration.server}:${configuration.httpPort}`;
    };

    toggleConfig = () => {
        console.log("Config has changed.");
        this.isLocalhost = !this.isLocalhost;
    };
}

export const systemConfig = ConfigController.getInstance();

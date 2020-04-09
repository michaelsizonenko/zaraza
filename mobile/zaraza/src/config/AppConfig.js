import config from './config';

import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import { I18nManager} from "react-native";


const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    ru: () => require("../translations/ru.json"),
    en: () => require("../translations/en.json"),
    ua: () => require("../translations/ua.json")
};

export const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = {languageTag: "ua", isRTL: false};

    const {languageTag, isRTL} = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    i18n.locale = languageTag;
};

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

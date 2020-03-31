import plugshare_config from "../config/FilterConfig";
import {getFromStorage,saveToStorage} from "./StorageService";

export const getOutletConfig = () => plugshare_config.outlets_all;
export const getNetworkConfig = () => plugshare_config.filterable_networks;
const _storageName='filters';

export const getFiltersFromStorage=async () =>getFromStorage(_storageName);
export const  saveFilterToStorage=async (value) =>saveToStorage(_storageName, value);





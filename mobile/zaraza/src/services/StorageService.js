import {AsyncStorage} from "react-native";
import {EmptyStorage} from "../exceptions/Errors";


export async function getFromStorage(storageName) {

    const value = await AsyncStorage.getItem(storageName);
    if (value !== null) {
        // Our data is fetched successfully
        console.log(JSON.stringify(value));
        return value;

    }
    throw EmptyStorage('filters');
}

export async function saveToStorage(storageName,value) {
    return AsyncStorage.setItem(storageName, JSON.stringify(value));
}




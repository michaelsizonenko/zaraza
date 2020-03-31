import places from '../config/places';

const _storageName='cluster';

export const  getClustersFromStorage=async () =>getFromStorage(_storageName);
export const  saveClusterToStorage=async (value) =>saveToStorage(_storageName, value);

export const  downloadData=async ()=>{
             return getData()
    };

export const  getData=()=>places;

export const  transform2geoJsonPoint=(x)=> {
        return {
            "type": "Feature",
            "properties":{},
            "geometry": {
                "type": "Point",
                "coordinates": [x[1], x[0]]
            }
        };
    };



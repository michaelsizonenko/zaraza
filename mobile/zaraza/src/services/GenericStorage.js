import { AsyncStorage } from '@react-native-community/async-storage'

const cache={};
export async function save(field,data){
  cache[field]=data;
  const data_string=JSON.stringify(data);
  return AsyncStorage.setItem(field);
};
export async function load(field,default_value){
  if  (cache[field])
    return cache[field];

  const  _store=(x)=>{
    const value=JSON.parse(x);
    cache[field]=value;
    return value;
  }
  const  _default=()=>{
  save(field,default_value);
  return default_value;
  }


  return AsyncStorage.getItem(field).then(_store).catch(_default);

}

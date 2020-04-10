import * as storage from './GenericStorage';

export async function getLanguage(){
  return storage.load('language','ua');
}
export async function setLanguage(language){
  return storage.save('language',language);
}

export async function setLocalhost(Value){
  return storage.save('localhost',value);
}

export async function getLocalhost(){
  return storage.load('localhost','true');
}

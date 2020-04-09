import * as storage from 'GenericStorage';

export async function getLanguage(){
  storage.load('language','ua');
}
export async function setLanguage(){
  return storage.save('language');
}


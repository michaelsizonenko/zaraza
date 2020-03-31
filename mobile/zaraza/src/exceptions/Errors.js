function exception(name,message){
    return {name:name,message:message};
}

export function EmptyStorage(storage){
    let result=exception('EmptyStorage','Storage is empty:'+storage);
    result.storageName=storage;
    return result;
}

import { self } from 'react-native-threads';
import Supercluster from "supercluster";




let index;
const  load=(data)=>{

    const geojson=data.map(transform2geoJsonPoint);

    const now = Date.now();



    index = new Supercluster({
        log: true,
        radius: 60,
        extent: 256,
        maxZoom: 17
    }).load(geojson);

    console.log(index.getTile(0, 0, 0));

    postMessage({command:'Ready',status:'OK'});



}

function getZoom(params) {
    postMessage({
        expansionZoom: index.getClusterExpansionZoom(params.clusterId),
        center: params.center
    });
}


function getClusters(params){
    postMessage(index.getClusters(params.bbox, params.zoom))
}

const receiveCommands=(command)=>{
    console.log('thread:'+command.command);
         switch(command.command){
             case 'LOAD': load(command.data);break;
             case 'CLUSTER':getClusters(command.params);
             case 'ZOOM':getZoom(command.params);
             default: console.log('Unhandled thread Pipe command:'+command.command);
         }
}



self.onmessage= receiveCommands;
const postmessage=(msg)=>{
    self.postMessage(JSON.stringify(msg))
}

//importing the rxjs library
import * as rxjs from 'rxjs';
import _ from 'lodash';
import { Thread } from 'react-native-threads';
import  * as ClusterDataService from '../services/ClusterDataService';
import {getData} from "../services/ClusterDataService";
import * as ClusterFilter from '../lib/Filtering';

// start a new react native JS process
const thread = new Thread('worker.thread.js');


thread.onmessage=(a)=>{
    clusterBlock.persist(JSON.parse(a));
}

const SuperClusterCommands={
    IDLE: {command:'IDLE'},
    LOAD:{command:'LOAD',data:{}},
    CLUSTERS:{command:'CLUSTERS',params:{bbox:[],zoom:1}},
    ZOOM:{command:'ZOOM',params:{center:{},clusterId:1}},
    STOP:{command:'STOP'},

    INITIAL:{command:'INITIAL'}
};


class ClusteringBloc {



    constructor() {
        const value = {command: 'initial', status: 'OK'};////????????
        this.clusterCommandPipe = new rxjs.BehaviorSubject(SuperClusterCommands.INITIAL);
        this.clusteringState = new rxjs.BehaviorSubject(value);
        this.load().then(() => thread.postMessage('subscribe'));

    }


    getValue=()=>{
        return this.clusterState.getValue();
    };

    async persist (value){
        this.filterState.next(value);
        //save to  local  storage;
        await ClusterDataService.saveClusterToStorage(value);
    };

    load=async()=>{
        try {
            const value =await ClusterDataService.getClustersFromStorage();
            this.persist(JSON.parse(value));
        } catch (error) {
            console.log(JSON.stringify(error));
            return {outlets: outletConfig, networks: networkConfig};
        }
    };

    getClusteringState = () => this.clusteringState;

    getCommandPipe=()=> this.clusterCommandPipe;


    stopThread(){
        thread.terminate()
    };

    filterChanged(newFilter){

        const  data=ClusterDataService.getData();
        const {networkFilter, outletFilter} = ClusterFilter.transformFiltersForCluster(newFilter);
        const clusterData=ClusterFilter.filter(data,networkFilter,outletFilter);
        //send for clustering
        this.requestClustering(clusterData);
    }

    requestClustering(clusterData) {
        let command={...SuperClusterCommands.LOAD};//clone
        command.data=clusterData;
        this.clusterCommandPipe.next(command);
        thread.postMessage(JSON.stringify(SuperClusterCommands.LOAD));

    }
}

const clusterBlock= new ClusteringBloc();
export default clusterBlock;
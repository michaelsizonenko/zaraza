// //importing the rxjs library
// import * as rxjs from 'rxjs';
// import _ from 'lodash';
// import *  as FilterConfigService from "../services/FilterConfigService";
//
//
// let outletConfig = FilterConfigService.getOutletConfig().filter(x => !x.disabled);
// let networkConfig = FilterConfigService.getNetworkConfig();
//
//
//
//
// class MainScreenBloc {
//
//
//
//     constructor() {
//         const  value={outlets: outletConfig, networks: networkConfig};
//         this.mainState = new rxjs.BehaviorSubject(value);
//         this.load();//creating our BehaviorSubject with initial value of 0
//
//     }
//     _getValue=()=>{
//         return this.filterState.getValue();
//     };
//
//     async persist (value){
//         this.filterState.next(value);
//         //save to  local  storage;
//         await FilterConfigService.saveFilterToStorage(value);
//
//     };
//
//     load=async()=>{
//             try {
//                 const value =await FilterConfigService.getFiltersFromStorage();
//                 this.persist(JSON.parse(value));
//             } catch (error) {
//                 console.log(JSON.stringify(error));
//                 return {outlets: outletConfig, networks: networkConfig};
//             }
//         };
//
//
//     //an increment function that deals with the subject
//     toggle_outlet = (id) => this.toggle_filter('outlets', id);
//     toggle_network = (id) => this.toggle_filter('networks', id);
//
//     is_selected=(filter,id)=> {
//
//         return this.locateFilter(filter, id).selected;
//     };
//
//     locateFilter(filter, id) {
//         const value=this._getValue();
//         console.assert(Object.keys(value).includes(filter), 'wrong selector:'+filter);
//         return _.find(value[filter], {"id": id});
//     }
//
//     toggle_filter = (filter, id) => {
//         const value=this._getValue();
//         const  filterData=this.locateFilter(filter,id);
//         filterData.selected=!filterData.selected;
//         this.persist(value);
//
//     };
//
//     outletsSelected=()=>this.filtersSelected('outlets');
//     allOutlets=()=>this.allFilters('outlets');
//     outletsWarning=()=>this.filterWarning('outlets');
//
//     networksSelected=()=>this.filtersSelected('networks');
//     allNetworks=()=>this.allFilters('networks');
//     networkWarning=()=>this.filterWarning('networks');
//
//
//     filterWarning=(filter)=>this.filtersSelected(filter)==0;
//
//     allFilters=(filter)=>{
//         const filters=this._getValue()[filter];
//         return filters.length;
//     };
//
//     toggle_all_filters = (filter, on_off) => {
//         console.assert(Object.keys(this._getValue()).includes(filter), 'wrong selector'+filter);
//         const value=this._getValue();
//         value[filter].forEach(filter=>filter.selected=on_off);
//         this.persist(value);
//     };
//
//     toggle_filter_pressed=(filter)=> {
//         const number_of_on=this.filtersSelected(filter);
//         const on_off = number_of_on < this.allFilters(filter);
//         this.toggle_all_filters(filter, on_off);
//
//     };
//
//
//     filtersSelected(filter) {
//         const value = this._getValue();
//         const filterSet = value[filter];
//         const states = _.map(filterSet, 'selected');
//         return _.reduce(states, _.add, 0);
//     }
//
//     toggle_all_networks = () => this.toggle_filter_pressed('networks');
//     toggle_all_outlets = () => this.toggle_filter_pressed('outlets');
//
//     //the get function to return the subject. It allows the component to subscribe as Observer.
//     getFilterState = () => {
//         return this.filterState;
//     };
//
//
// }
//
// export default  new MainScreenBloc();

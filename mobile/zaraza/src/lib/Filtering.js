
import _ from 'lodash';



function _getTransformer(other_value){
    console.assert(['outlets','networks'].indexOf(other_value)!=-1,'wrong selector specified:'+other_value);
    const ids={'networks':-1,'outlets':0};
    const replacement_id=ids[other_value];

    const transformer=(result,e)=>{
        if(e.selected){
            const index=e.id==replacement_id?'*':e.id;
            result[index]=1;
        }
        return result;
    }
    return transformer;

}

const _netTransformer=_getTransformer('networks');
const _outTransformer=_getTransformer('outlets');


export function transformFiltersForCluster(filter) {


    return {
        outletFilter: filter.outlets.reduce(_outTransformer, {}),
        networkFilter: filter.networks.reduce(_netTransformer, {})
    };
}

export function filter(data,networkFilters,outletFilters){

    const outlets_filtered=apply_outlet_filter(data.data,outletFilters,data.all_outlets);
    return apply_network_filter(outlets_filtered,networkFilters,data.all_networks);
}


function apply_network_filter(data_array,network_filters,all_networks){
    return  apply_filter(data_array,network_filters,all_networks,3)
}
 function apply_outlet_filter(data_array,outlet_filters,all_outlets){
    return apply_filter(data_array,outlet_filters,all_outlets,2);
}

let  counter=0;
function apply_filter(data,filters,possible_filter_values,field_index){
//"[47.616,-122.3335,{"1":1,"2":1},{"1":1}]"
    const filter_difference =_.difference(possible_filter_values,filters);//excluded

    function filterFunction(point){

        if (typeof filters['*']=='undefined'){
            //console.log('no "others"selected , only  those selected pass');
            const data=point[field_index];
            const intersection=_.intersection(_.keys(data), _.keys(filters)); // ['c']
            return !_.isEmpty(intersection);
        }
        //console.log('exclude not selected and return  all others');
        const data=point[field_index];
        const difference=_.intersection(_.keys(data), _.keys(filter_difference));
        return  !_.isEmpty(difference);
    }
    counter++;
    return data.filter(filterFunction)
}

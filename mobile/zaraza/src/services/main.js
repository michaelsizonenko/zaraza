
const network_filters={4:1,5:1,7:1,8:1//,'*':1
//
};
const all_networks=superclusterData.aall_networks;

const outlet_filters={4:1,5:1,7:1,8:1
//    ,'*':1
};

const all_outlets=superclusterData.all_outlets;
function apply_network_filter(data){
    return  apply_filter(data,network_filters,all_networks,3)

}
function apply_outlet_filter(data){
    return apply_filter(data,outlet_filters,all_outlets,2);
}

function filter(data){
    return apply_network_filter(apply_outlet_filter(data));
}



function apply_filter(data,filters,possible_values,field_index){
//"[47.616,-122.3335,{"1":1,"2":1},{"1":1}]"
    const filter_difference =_.difference(possible_values,filters);//excluded

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

    return data.filter(filterFunction)
}
console.log(superclusterData.keys)
apply_outlet_filter(superclusterData.data);

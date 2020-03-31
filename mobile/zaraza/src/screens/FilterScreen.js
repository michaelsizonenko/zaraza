// import * as React from 'react';
// import {Button, List, TouchableRipple, Snackbar} from 'react-native-paper';
// import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
// import * as OutletImages from "../images/filter/outlet";
// import * as NetworkImages from "../images/filter/network"
// import * as Color from "react-native-paper/src/styles/colors";
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// //import bloc from "../blocs/MainScreenBloc";
// import BlocWrapper from "../utils/BlocWrapper";
//
//
// function OutletFilter() {
//
//     function createButton(cfg) {

//
//         function Icon() {
//             if (cfg.icon) {
//                 return <AwesomeIcon name={cfg.icon} style={outletStyle.icon}/>
//             } else {
//                 return <Image source={OutletImages[cfg.image]} style={outletStyle.image}/>
//             }
//         }
//
//         function Badge() {
//             const is_selected = bloc.is_selected('outlets', cfg.id);
//             if (!is_selected)
//                 return null;
//
//             return (<AwesomeIcon name='check-circle' style={outletStyle.badge}/>)
//         }
//
//         return (<TouchableRipple
//                 onPress={() => bloc.toggle_outlet(cfg.id)}
//                 rippleColor="rgba(0, 0, 0, .32)"
//             >
//                 <View style={outletStyle.cell}>
//
//                     <View style={outletStyle.badgeContainer}>
//                         <Badge/>
//                     </View>
//                     <View style={outletStyle.imageContainer}>
//                         <Icon/>
//                     </View>
//                     <Text style={outletStyle.text}>{cfg.short_name}</Text>
//                 </View>
//             </TouchableRipple>
//
//         );
//
//
//     }
//
//     const outletConfig = bloc._getValue()['outlets'];
//     return (
//
//         <FlatList numColumns={numColumns}
//                   scrollEnabled={false}
//                   data={outletConfig}
//                   renderItem={({item}) =>
//                       createButton(item)}
//                   keyExtractor={item => item.id}
//
//         />
//     )
//
//
// }
//
// const style_test = {color: Color.greenA400, fontSize: 15, position: "absolute", right: 10};
//
//
// function NetworkFilter({value}) {
//
//
//     function createButton(cfg) {
//
//         function Icon() {
//             const icon_source = NetworkImages[cfg.image];
//             return <Image source={icon_source} style={networkStyles.image}/>
//         }
//
//
//         function Badge() {
//             const is_selected = bloc.is_selected('networks', cfg.id);
//             if (!is_selected)
//                 return null;
//             return (<AwesomeIcon name='check-circle' style={networkStyle.badge}/>);
//         }
//
//
//         return (
//
//
//             <TouchableRipple
//                 onPress={() => bloc.toggle_network(cfg.id)}
//                 rippleColor="rgba(0, 0, 0, .32)"
//             >
//                 <View style={networkStyle.cell}>
//
//                     <View style={outletStyle.badgeContainer}>
//                         <Badge/>
//                     </View>
//                     <View style={networkStyle.imageContainer}>
//                         <Icon/>
//                     </View>
//                     <Text style={networkStyles.text}>{cfg.name}</Text>
//                 </View>
//             </TouchableRipple>
//
//         )
//
//     }
//
//     const networkConfig = bloc._getValue()['networks'];
//     return (
//
//         <FlatList numColumns={numColumns}
//                   scrollEnabled={false}
//                   data={networkConfig}
//                   renderItem={({item}) =>
//                       createButton(item)}
//                   keyExtractor={item => item.id}
//
//         />
//     )
//
//
// }
//
// const numColumns = 3;
//
// function Warning({cond}){
//     if  (cond) return (<Text style={warningStyle.icon}><AwesomeIcon name='exclamation-circle' /></Text>);
//     return  null;
// }
//
//
// class FilterScreen extends React.Component {
//
//     constructor(data) {
//         super();
//         this.state.data = data;
//     }
//
//     state = {
//         expandedNetworks: false,
//         expandedOutlets: false,
//         value: 'left',
//         data: {},
//         visible: true
//     };
//
//     _handlePress = (filterName) => {
//
//         const newState = {};
//         newState[filterName] = !this.state[filterName];
//         this.setState(newState);
//     };
//
//
//     render() {
//         return (<ScrollView>
//
//             <List.Section title="Filters">
//                 <List.Accordion
//                     title={<React.Fragment>
//                         <Text>Outlets Filter ({bloc.outletsSelected()}/{bloc.allOutlets()}) <Warning cond={bloc.outletsWarning()}/></Text>
//                     </React.Fragment>}
//                     expanded={this.state.expandedOutlets}
//                     left={props => <List.Icon {...props} icon="plug"/>}
//                     onPress={this._handlePress.bind(this, 'expandedOutlets')}
//                 >
//                     {this.state.expandedOutlets &&
//                     (<React.Fragment>
//                         <Button icon="plug" mode="outlined"
//                                 onPress={() => bloc.toggle_all_outlets()}
//                                 style={{alignSelf: 'center'}}
//                         >Toggle all </Button>
//
//                         <OutletFilter/>
//                     </React.Fragment>)}
//
//                 </List.Accordion>
//
//                 <List.Accordion
//                     title=
//                         {
//                             //<View style={{flexDirection:'row',alignSelf:'stretch',justifyContent:'space-around'}}>
//                             <Text>Network Filter ({bloc.networksSelected()}/{bloc.allNetworks()}) <Warning cond={bloc.networkWarning()}/></Text>
//                             //<Button icon="registered" mode="outlined" onPress={() => console.log('Pressed')}> Toggle all</Button>
//                             //</View>
//                         }
//
//                     left={props => <List.Icon {...props} icon="registered"/>}
//                     expanded={this.state.expandedNetworks}
//                     onPress={this._handlePress.bind(this, 'expandedNetworks')}
//                 >
//                     {this.state.expandedNetworks &&
//
//                     (
//                         <React.Fragment>
//                             <Button icon="registered" mode="outlined"
//                                     onPress={() => bloc.toggle_all_networks()}
//                                     style={{alignSelf: 'center'}}
//                             >Toggle all</Button>
//                             <NetworkFilter/>
//                         </React.Fragment>)
//
//                     }
//
//                 </List.Accordion>
//
//             </List.Section>
//         </ScrollView>);
//
//
//     }
// }
//
//
// const buttonContainerHeight = Dimensions.get('window').width / numColumns * 0.95;
// const buttonContainerWidth = buttonContainerHeight;
//
// const imageMargin = 10;
//
// const buttonIconWidth = buttonContainerHeight * 0.6;
// // noinspection JSSuspiciousNameCombination
// const buttonIconHeight = buttonIconWidth;
// const iconImagefontSize = 60;
// const buttonBorderColor = Color.grey300;
//
// const networkStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginVertical: 1,
//         borderWidth: 1,
//
//     },
//     holder: {
//         flex: 3
//     },
//     item: {
//         // flexDirection: "row",
//         backgroundColor: 'transparent',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 5,
//         margin: 1,
//         height: buttonContainerHeight,
//         borderColor: buttonBorderColor
//
//     },
//     itemInvisible: {
//         backgroundColor: 'transparent',
//     },
//     itemText: {
//         flex: 1
//         //    color: 'B',
//     },
//     image: {
//
//         marginTop: imageMargin,
//         marginBottom: imageMargin,
//         width: buttonContainerHeight * 2 / 3,
//         height: buttonContainerHeight * 2 / 6
//
//     },
//     badge: {
//         // ...StyleSheet.absoluteFillObject,
//         backgroundColor: Color.redA400,
//         // alignSelf: 'flex-end',
//         marginTop: 5,
//         position: 'absolute', // add if dont work with above
//         marginRight: 5,
//
//     }
//
// });
// const warningStyle = StyleSheet.create(
//     {
//         icon: {
//             fontSize:26,
//             color: Color.orangeA700
//         }
//     }
// );
//
//
// const outletStyle = StyleSheet.create({
//     cell: {
//         flexDirection: 'column',
//         width: buttonContainerWidth,
//         height: buttonContainerHeight,
//         marginLeft: 5,
//         marginTop: 5,
//         padding: 2,
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: Color.black
//     },
//     badgeContainer: {
//         alignSelf: 'stretch',
//         height: 26,
//
//     },
//     badge: {
//         fontSize: 26,
//         alignSelf: 'flex-end',
//         color: Color.greenA400,
//
//     },
//     imageContainer: {
//         marginTop: 1,
//         marginBottom: 1,
//
//     },
//     image: {
//         marginTop: 1,
//         marginBottom: 1,
//         width: buttonIconWidth,
//         height: buttonIconHeight
//
//
//     },
//     text: {
//         flex: 1,
//         alignContent: 'center'
//
//     },
//     icon: {
//         fontSize: iconImagefontSize,
//         marginTop: 1,
//         marginLeft: 1,
//         marginBottom: 1,
//         width: buttonIconWidth,
//         height: buttonIconHeight
//
//     }
//
// });
//
// const networkStyle = StyleSheet.create({
//     cell: {
//         flexDirection: 'column',
//         width: buttonContainerWidth,
//         height: buttonContainerHeight,
//         marginLeft: 5,
//         marginTop: 5,
//         padding: 2,
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: buttonBorderColor,
//     },
//     badgeContainer: {
//         alignSelf: 'stretch',
//         height: 26
//     },
//     badge: {
//         fontSize: 26,
//         alignSelf: 'flex-end',
//         color: Color.greenA400,
//     },
//     imageContainer: {
//         marginTop: 1,
//         marginBottom: 1,
//
//     },
//     image: {
//         marginTop: 1,
//         marginBottom: 1,
//         width: buttonIconWidth,
//         height: buttonIconHeight
//
//
//     },
//     text: {
//         flex: 1,
//         alignContent: 'center'
//
//     },
//     icon: {
//         fontSize: iconImagefontSize,
//         marginTop: 1,
//         marginLeft: 1,
//         marginBottom: 1,
//         width: buttonIconWidth,
//         height: buttonIconHeight
//
//     }
//
// });
function FilterScreen(){
    return null;
}

export default FilterScreen;

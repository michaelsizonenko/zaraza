import * as React from 'react';
import {View, TouchableOpacity, Text, Button} from 'react-native';
import {getWebUrl} from "../config/AppConfig";


export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            developerMode: false,
            counter: 0
        }
    }

    _onTouchScreen = () => {
        console.log(`Screen touched. ${this.state.counter}`);
        this.setState({
            counter: this.state.counter + 1
        })
    };

    render() {
        return (
            <React.Fragment>
                {this.state.counter > 3 && <View style={{flex: 2, background: 'red'}}>
                    <>
                        <Text>Development options</Text>
                        <Text>{getWebUrl()}</Text>
                        <Button
                            title={"Toggle"}/>
                    </>
                </View>}
                <TouchableOpacity style={{flex: 1}} onPress={this._onTouchScreen}>
                    {/*<Text>test</Text>*/}
                </TouchableOpacity>
            </React.Fragment>
        );
    }
}


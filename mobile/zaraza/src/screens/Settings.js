import * as React from 'react';
import {View, TouchableOpacity, Text, Button} from 'react-native';
import {getWebUrl, toggleConfig} from "../config/AppConfig";
import {SafeAreaView} from "react-native-safe-area-context";
import { RadioButton } from "react-native-paper";
import { L, setLanguage } from "../texts/Strings";

export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            webUrl: getWebUrl(),
            developerMode: false,
            counter: 0,
            language: 'ua'
        }
    }

    _onTouchScreen = () => {
        console.log(`Screen touched. ${this.state.counter}`);
        this.setState({
            counter: this.state.counter + 1
        })
    };

    _toggleConfig = () => {
        toggleConfig();
        this.setState({
            webUrl: getWebUrl()
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.counter > 3 &&
                <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                    <View style={{width: '80%'}}>
                        <Text style={{textAlign: 'center', fontSize: 20, margin: 10}}>Development options</Text>
                        <Text style={{margin: 10}}>Server host : {this.state.webUrl}</Text>
                        <Button
                            onPress={this._toggleConfig}
                            title={"Toggle server"}/>
                    </View>
                </SafeAreaView>
                }
                <View>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{L("INTERFACE")} :</Text>
                    <RadioButton.Group
                        onValueChange={language => {
                            setLanguage(language);
                            this.setState({language});
                        }}
                        value={this.state.language}
                    >
                            <RadioButton.Item label={"Українська"} value="ua"/>
                            <RadioButton.Item label={"Русский"} value="ru"/>
                            <RadioButton.Item label={"English"} value="en"/>
                    </RadioButton.Group>
                </View>
                <TouchableOpacity style={{flex: 1}} onPress={this._onTouchScreen}>
                    {/*<Text>test</Text>*/}
                </TouchableOpacity>
            </React.Fragment>
        );
    }
}


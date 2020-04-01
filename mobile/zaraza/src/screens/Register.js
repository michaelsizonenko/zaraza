import * as React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';


export default class RegisterScreen extends React.Component {

    render() {
        return (
            <React.Fragment>
                <View>
                    <Text>Register form</Text>
                    <Button title={"Register"} />
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

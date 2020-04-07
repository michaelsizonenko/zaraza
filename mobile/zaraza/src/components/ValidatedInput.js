import * as React from 'react';
import PhoneInput from "react-native-phone-input";
import {styles} from "../styles/Styles";
import Text from "react-native-paper/src/components/Typography/Text";
import DatePicker from "react-native-datepicker";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";
import {View} from "react-native";

export function ValidatedPhoneInput(props) {

    let {name, values, handleChange, errors, setFieldTouched, touched, handleSubmit, placeholder, numberOfLines, keyboardType, disabled} = {...props};
    return <>
        <PhoneInput
            initialCountry="ua"
            forwardRef='phone'
            style={styles.phoneInput}
            onPressFlag={() => {
            }}
            disabled={disabled}
            value={values[name]}
            onChangePhoneNumber={(n) => {
                values[name] = n;
                props.handleNumberChange(n);
            }}
        />
        {touched[name] && errors[name] &&
        <Text style={{fontSize: 10, color: 'red'}}>{errors[name]}</Text>
        }
    </>

}

export class ValidatedDateInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder
        }
    }

    render() {
        //todo: start calendar from some date e.g. 1980-01-01 for convenience
        return (<>
            <DatePicker
                style={{width: undefined}}
                date={this.props.values[this.props.name]}
                mode="date"
                androidMode="spinner"
                placeholder={this.state.placeholder}
                format="YYYY-MM-DD"
                minDate="1920-01-01"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                    dateInput: {
                        marginVertical: 10,
                        height: 60,
                        borderRadius: 3,
                    },
                    placeholderText: {
                        fontSize: 16,
                        color: '#333'
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(d) => {
                    this.props.handleDateChange(d);
                    this.setState({
                        placeholder: d
                    });
                }}
            />
            {this.props.touched[this.props.name] && this.props.errors[this.props.name] &&
            <Text style={{fontSize: 10, marginTop: 10, color: 'red'}}>{this.props.errors[this.props.name]}</Text>
            }
        </>)
    }

}

export function ValidatedTextInput(props) {
    // по name можно доставать значения input
    let {name, values, handleChange, errors, setFieldTouched, touched, handleSubmit, placeholder, numberOfLines, keyboardType, callback} = {...props};
    numberOfLines = numberOfLines ? numberOfLines : 13;
    keyboardType = keyboardType ? keyboardType : 'default';

    return <>
        <TextInput
            onChangeText={() => {handleChange(name); callback && callback(values[name])}}
            value={values[name]}
            onBlur={setFieldTouched.bind(this, name)}
            placeholder={placeholder}
            keyboardType={keyboardType}
            name={name}
            mode="outlined"
            numberOfLines={numberOfLines}
        />
        {touched[name] && errors[name] &&
        <Text style={{fontSize: 10, color: 'red'}}>{errors[name]}</Text>
        }
    </>;
}

export function Separator() {
    return <View style={styles.separator}/>;
}

export function BlankSeparator() {
    return <View style={styles.blankSeparator}/>;
}

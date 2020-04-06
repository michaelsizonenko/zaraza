import * as React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    PermissionsAndroid,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native';
import {Formik} from 'formik';
import TextInput from 'react-native-paper/src/components/TextInput/TextInput';
import * as Yup from 'yup';
import Text from 'react-native-paper/src/components/Typography/Text';
import { L } from '../texts/Strings';
import {RadioButton} from 'react-native-paper';
import PhoneInput from "react-native-phone-input";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import GooglePlacesInput from '../components/Addresses';
import ImagePicker from "react-native-image-picker";
import DatePicker from 'react-native-datepicker';
import Geolocation from "react-native-geolocation-service";
import NetInfo from "@react-native-community/netinfo";
import {isLocalhost, toggleConfig, getWebUrl} from '../config/AppConfig';


class ValidatedDateInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder
        }
        // props.handleChange();
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

function ValidatedTextInput(props) {
    // по name можно доставать значения input
    let {name, values, handleChange, errors, setFieldTouched, touched, handleSubmit, placeholder, numberOfLines, keyboardType} = {...props};
    numberOfLines = numberOfLines ? numberOfLines : 13;
    keyboardType = keyboardType ? keyboardType : 'default';

    return <>
        <TextInput
            onChangeText={handleChange(name)}
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

function ValidatedPhoneInput(props) {

    let {name, values, handleChange, errors, setFieldTouched, touched, handleSubmit, placeholder, numberOfLines, keyboardType} = {...props};
    return <>
            <PhoneInput
                initialCountry="ua"
                forwardRef='phone'
                style={styles.phoneInput}
                onPressFlag={() => {
                }}
                value={values[name]}
                onChangePhoneNumber={(n) => {
                    values[name] = n
                }}
            />
            {touched[name] && errors[name] &&
            <Text style={{fontSize: 10, color: 'red'}}>{errors[name]}</Text>
            }
        </>

}


export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: false
        }
    }

    async componentDidMount(): void {
        while (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        }

        await Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015 * 3,
                    longitudeDelta: 0.0121 * 3,
                };
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                this.setState({
                    region: region,
                    userLocation: userLocation
                })
            },
            (error) => {
                // See error code charts below.
                console.error(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );

        // const unsubscribe = NetInfo.addEventListener(state => {
        //     console.log("Connection type", state.type);
        //     console.log("Is connected?", state.isConnected);
        // });
    }

    isValidDate = (s) => {
        if (!s) return false;
        if (s.length !== 10) return false;
        let bits = s.split('.');
        let y = bits[2],
            m = bits[1],
            d = bits[0];
        // Assume not leap year by default (note zero index for Jan)
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if ((!(y % 4) && y % 100) || !(y % 400)) {
            daysInMonth[1] = 29;
        }
        const result = !(/\D/.test(String(d))) && d > 0 && d <= daysInMonth[--m];
        console.log(result);
        return result;
    };

    isValidPhoneNumber = (n) => {
        if (!n) return false;
        if (n.length !== 13) return false;
        return true;
    };

    SignUpSchema = Yup.object().shape({
        last_name: Yup.string()
            .min(2, L('TOO_SHORT'))
            .max(70, L('TOO_LONG'))
            .required(L('REQUIRED')),
        first_name: Yup.string()
            .min(2, L('TOO_SHORT'))
            .max(70, L('TOO_LONG'))
            .required(L('REQUIRED')),
        second_name: Yup.string()
            .min(2, L('TOO_SHORT'))
            .max(70, L('TOO_LONG'))
            .required(L('REQUIRED')),
        // documentIsPassport: Yup.boolean()
        //     .required(L('DOCUMENT_TYPE_REQUIRED')),
        // doc_number: Yup.string()
        //     .min(8, L('TOO_SHORT'))
        //     .max(12, L('TOO_LONG'))
        //     .required(L('REQUIRED')),
        // doc_type: Yup.string()
        //     .required(L('REQUIRED')),
        birth_date: Yup.string()
            .required(L('REQUIRED')),
        gender: Yup.string()
            .required(L('REQUIRED')),
        address: Yup.string()
            .required(L('REQUIRED')),
        phone_number: Yup.string()
            .test("valid", L('WRONG_PHONE_NUMBER'), this.isValidPhoneNumber),
        temperature: Yup.number()
            .required(L('REQUIRED')),
    });

    //TODO: erase image by uri  after upload
    //todo:resize imge ?
    handleImagePress = (props) => {
        const options = {
            cameraType: 'back',
            mediaType: 'photo',
            maxWidth: 240,
            maxHeight: 240,
            quality: 0.5,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                const source = {uri: res.uri};
                console.log('response', JSON.stringify(res));
                props.setFieldValue('image', res);
            }
        });
    };


    render() {

        if (this.state.progress) {
            return (
                <View style={[styles.containerSpinner, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }

        return (

            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Formik
                        initialValues={{
                            first_name: '',
                            second_name: '',
                            last_name: '',
                            birth_date: '',
                            phone_number: '+380',
                            address: '',
                            gender: '',
                            temperature: ''
                        }}
                        onSubmit={async (values) => {
                            console.log("SUBMIT", values);
                            this.setState({
                                progress: true
                            });
                            try {
                                const result = await fetch(getWebUrl() + '/citizens/', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(values),
                                });
                                console.log(result);
                                if (!result.ok) {
                                    Alert.alert("Произошла ошибка!");
                                    return;
                                }
                                Alert.alert("Гражданин зарегистрирован успешно!");

                            } catch (e) {
                                console.error(e);
                            } finally {
                                this.setState({
                                    progress: false
                                });
                            }

                        }}
                        validationSchema={this.SignUpSchema}
                    >
                        {(props) => (
                            <View style={styles.form}>

                                <ValidatedPhoneInput name='phone_number'
                                                     {...props} />

                                {/*{props.values.image && <Image source={props.values.image} style={{height: 100}}/>}*/}

                                {/*<AwesomeIcon name="camera" size={30} color="#900"*/}
                                {/*             onPress={this.handleImagePress.bind(self, props)}/>*/}

                                {/*<ValidatedTextInput name='doc_number' placeholder={L('DOC_NUMBER')} {...props}/>*/}

                                {/*<RadioButton.Group*/}
                                {/*    onValueChange={props.handleChange('doc_type')}*/}
                                {/*    value={props.values['doc_type']}*/}
                                {/*    name="doc_type"*/}
                                {/*>*/}
                                {/*    <RadioButton.Item label={L('PASSPORT')} value="passport"/>*/}
                                {/*    <RadioButton.Item label={L('ID_CARD')} value="id"/>*/}
                                {/*    <RadioButton.Item label={L('DRIVER_LICENSE')} value="driver_licence"/>*/}

                                {/*    {props.touched['doc_type'] && props.errors['doc_type'] &&*/}
                                {/*    <Text style={{fontSize: 10, color: 'red'}}>{props.errors['doc_type']}</Text>*/}
                                {/*    }*/}
                                {/*</RadioButton.Group>*/}

                                <ValidatedTextInput name='last_name'
                                                    placeholder={L('LNAME')}
                                                    {...props}/>
                                <ValidatedTextInput name='first_name'
                                                    placeholder={L('FNAME')}
                                                    {...props}/>
                                <ValidatedTextInput name='second_name'
                                                    placeholder={L('SNAME')}
                                                    {...props}/>

                                <BlankSeparator/>
                                <RadioButton.Group
                                    onValueChange={props.handleChange('gender')}
                                    value={props.values['gender']}
                                    name="gender"
                                >
                                    <RadioButton.Item label={L('MAN')} value="M"/>
                                    <RadioButton.Item label={L('WOMAN')} value="W"/>

                                    {props.touched['gender'] && props.errors['gender'] &&
                                    <Text style={{fontSize: 10, color: 'red'}}>{props.errors['gender']}</Text>
                                    }

                                </RadioButton.Group>

                                <BlankSeparator/>
                                <ValidatedDateInput name='birth_date'
                                                    placeholder={L('BIRTHDAY')}
                                                    handleDateChange={(d) => {
                                                        console.log('d:',d);
                                                        props.values['birth_date'] = d
                                                    }}
                                                    {...props}/>
                                <BlankSeparator/>
                                <ValidatedTextInput name='address'
                                                    placeholder={L('ADDRESS')}
                                                    numberOfLines={3}
                                                    {...props}/>
                                <BlankSeparator/>


                                <ValidatedTextInput name='temperature'
                                                    placeholder={L('TEMPERATURE')}
                                                    keyboardType='numeric'
                                                    {...props}/>
                                <Separator/>
                                {/*<Text>{"Errors : " + JSON.stringify(props.errors)}</Text>*/}
                                {/*<Separator/>*/}
                                {/*<Text>{"Touched : " + JSON.stringify(props.touched)}</Text>*/}
                                {/*<Separator/>*/}
                                {/*<Text>{"Values : " + JSON.stringify(props.values)}</Text>*/}
                                {/*<Separator/>*/}
                                <Button styles={styles.submit} onPress={props.handleSubmit} title={L('SUBMIT')}/>

                            </View>
                        )}
                    </Formik>
                </ScrollView>

            </SafeAreaView>
        );

        // return (
        // <SafeAreaView>
        //    <GooglePlacesInput />
        // </SafeAreaView>

        // );
    }
}

function Separator() {
    return <View style={styles.separator}/>;
}

function BlankSeparator() {
    return <View style={styles.blankSeparator}/>;
}


const styles = StyleSheet.create({
    phoneInput: {
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    containerSpinner: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize: 20,
    },
    form: {
        marginBottom: 30
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submit: {
        fontSize: 20,
        marginVertical: 10,
    },
    separator: {
        marginVertical: 15,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    blankSeparator: {
        marginVertical: 15,
    },
});

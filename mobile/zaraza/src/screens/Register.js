import * as React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    View,
    PermissionsAndroid,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Text from 'react-native-paper/src/components/Typography/Text';
import {L} from '../texts/Strings';
import {RadioButton} from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import {systemConfig} from '../config/AppConfig';
import {styles} from "../styles/Styles";
import {
    ValidatedPhoneInput,
    ValidatedTextInput,
    ValidatedDateInput,
    Separator,
    BlankSeparator
} from '../components/ValidatedInput';


export default class RegisterScreen extends React.Component {


    constructor(props) {
        super(props);
        this.steps = ["PHONE", "PERSONAL_DATA", "DOCUMENT", "TEMPERATURE"];
        this.state = {
            progress: false,
            isValidPhoneNumber: false,
            step: this.steps[0]
        };
        this.initValues = {
            first_name: '',
            second_name: '',
            last_name: '',
            birth_date: '',
            phone_number: '+380',
            address: '',
            gender: '',
            temperature: ''
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
    }

    isValidPhoneNumber = (n) => {
        if (!n) return false;
        return n.length === 13;
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

    _onSubmit = async (values) => {
        console.log("SUBMIT", values);
        this.setState({
            progress: true
        });
        try {
            const result = await fetch(systemConfig.getWebUrl() + '/citizens/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            console.log(result);
            if (!result.ok) {
                Alert.alert(L('ERROR'));
                return;
            }
            Alert.alert(L('REGISTER_SUCCESS'));

        } catch (e) {
            console.error(e);
        } finally {
            this.setState({
                progress: false
            });
        }

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
                        initialValues={this.initValues}
                        onSubmit={this._onSubmit}
                        validationSchema={this.SignUpSchema}
                    >
                        {(props) => (
                            <View style={styles.form}>

                                {this.state.step === this.steps[0] &&
                                <View style={styles.formContainer}>
                                    <Text style={styles.header}>{L('STEP1TITLE')}</Text>
                                    <Text style={styles.description}>{L('STEP1DESC')}</Text>
                                    <ValidatedPhoneInput name='phone_number'
                                                         handleNumberChange={(n) => {
                                                             this.setState({
                                                                 isValidPhoneNumber: this.isValidPhoneNumber(n)
                                                             });
                                                         }}
                                                         {...props} />

                                    <Button style={styles.formButton}
                                            disabled={!this.state.isValidPhoneNumber}
                                            title={L("VERIFY_PHONE")}
                                    />
                                    <ValidatedTextInput name='confirmation_message'
                                                        placeholder={L('CONFIRMATION_SMS')}
                                                        {...props}/>
                                    <Button style={styles.formButton}
                                            disabled={true}
                                            title={L("NEXT")}/>
                                    <Text>{"Errors : " + JSON.stringify(props.errors)}</Text>
                                    <Separator/>
                                    <Text>{"Touched : " + JSON.stringify(props.touched)}</Text>
                                    <Separator/>
                                    <Text>{"Values : " + JSON.stringify(props.values)}</Text>
                                    <Separator/>
                                </View>
                                }

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

                                {this.state.step === this.steps[1] &&
                                <>
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
                                        valuee={props.values['gender']}
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
                                                            console.log('d:', d);
                                                            props.values['birth_date'] = d
                                                        }}
                                                        {...props}/>
                                    <BlankSeparator/>
                                    <ValidatedTextInput name='address'
                                                        placeholder={L('ADDRESS')}
                                                        numberOfLines={3}
                                                        {...props}/>
                                    <BlankSeparator/>
                                </>
                                }


                                {this.state.step === this.steps[3] &&
                                <>
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
                                </>}
                            </View>
                        )}
                    </Formik>
                </ScrollView>

            </SafeAreaView>
        );

    }
}

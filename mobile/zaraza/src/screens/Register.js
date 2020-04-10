import * as React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    View,
    PermissionsAndroid,
    ActivityIndicator,
    Alert,
    Keyboard,
    Image,
    TextInput
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Text from 'react-native-paper/src/components/Typography/Text';
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
import {translate} from "../config/AppConfig";


export default class RegisterScreen extends React.Component {


    constructor(props) {
        super(props);
        this.steps = ["PHONE", "PERSONAL_DATA", "DOCUMENT", "TEMPERATURE"];
        this.state = {
            finished: false,
            success: false,
            errorMessage: "",
            progress: false,
            isValidPhoneNumber: false,
            isVerificationSent: false,
            verificationCodeHasEntered: false,
            step: this.steps[0],
            verificationCode: '',
            inputCode: ''
        };
        this.initValues = {
            first_name: '',
            second_name: '',
            last_name: '',
            birth_date: '',
            phone_number: '+380',
            doc_type: '',
            document: '',
            image: {},
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
            .min(2, translate('Too short!'))
            .max(70, translate('Too long!'))
            .required(translate('Required field')),
        first_name: Yup.string()
            .min(2, translate('Too short!'))
            .max(70, translate('Too long!'))
            .required(translate('Required field')),
        second_name: Yup.string()
            .min(2, translate('Too short!'))
            .max(70, translate('Too long!'))
            .required(translate('Required field')),
        // documentIsPassport: Yup.boolean()
        //     .required(translate("Choose document type")),
        // document: Yup.string()
        //     .min(8, translate('Too short!'))
        //     .max(12, translate('Too long!'))
        //     .required(translate('Required field')),
        // doc_type: Yup.string()
        //     .required(translate('Required field')),
        birth_date: Yup.string()
            .required(translate('Required field')),
        gender: Yup.string()
            .required(translate('Required field')),
        address: Yup.string()
            .required(translate('Required field')),
        phone_number: Yup.string()
            .test("valid", translate("Wrong phone number"), this.isValidPhoneNumber),
        temperature: Yup.number()
            .required(translate('Required field')),
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

    _onSubmit = async (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
        console.log("SUBMIT", values);
        this.setState({
            progress: true
        });
        try {
            delete values.image;
            const result = await fetch(systemConfig.getWebUrl() + '/citizens/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            console.log(result);
            if (result.ok) {
                this.setState({
                    finished: true,
                    success: true
                })
                return;
            }

            this.setState({
                finished: true,
                success: false,
                errorMessage: result.status
            })
        } catch (e) {
            console.error(e);
            this.setState({
                finished: true,
                success: false,
                errorMessage: e.errorMessage
            })
        } finally {
            resetForm({});
            this.setState({
                progress: false,
                isValidPhoneNumber: false,
                isVerificationSent: false,
                verificationCodeHasEntered: false,
                step: this.steps[0],
                verificationCode: '',
                inputCode: ''
            });
        }

    };

    isCorrectVerificationCode = (text) => {
        return this.state.verificationCode && (this.state.verificationCode.toString() === text)
    };

    isSecondStepReady = (values) => {
        return values.first_name && values.second_name && values.last_name && values.birth_date && values.gender && values.address;
    };

    isThirdStepReady = (values) => {
        return values.image && values.doc_type && values.document;
    };

    render() {

        if (this.state.progress) {
            return (
                <View style={[styles.containerSpinner, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }

        if (this.state.finished && this.state.success) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.header}>{translate("Success!")}</Text>
                    <Text style={styles.title}>{translate("Citizen has been registered successfully!")}</Text>
                    <View style={styles.formButtonWrapper}>
                        <Button
                            title={translate("Start a new registration")}
                            onPress={() => {
                                this.setState({
                                    finished: false,
                                    success: false,
                                    errorMessage: ""
                                })
                            }}
                        />
                    </View>
                    <View style={styles.formButtonWrapper}>
                        <Button
                            title={translate("Start a search")}
                            onPress={() => this.props.navigation.navigate('Screening')}
                        />
                    </View>
                </SafeAreaView>
            )
        }

        if (this.state.finished && !this.state.success) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.header}>{translate("Error occurred!")}</Text>
                    <Text style={styles.title}>{translate("This is weird! Please make a screen shot and send it to us")}</Text>
                    <Text>{this.state.errorMessage}</Text>
                    <View style={styles.formButtonWrapper}>
                        <Button
                            title={translate("Start a new registration")}
                            onPress={() => {
                                this.setState({
                                    finished: false,
                                    success: false,
                                    errorMessage: ""
                                })
                            }}
                        />
                    </View>
                </SafeAreaView>
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
                                    <Text style={styles.header}>{translate("Step 1 :")}</Text>
                                    <Text
                                        style={styles.description}>{translate("Please enter a valid citizen's phone number")}</Text>
                                    {/*todo: find a way to clear phone input inner state*/}
                                    <ValidatedPhoneInput name='phone_number'
                                                         handleNumberChange={(n) => {
                                                             if (this.isValidPhoneNumber(n)) {
                                                                 Keyboard.dismiss();
                                                                 this.setState({
                                                                     isValidPhoneNumber: this.isValidPhoneNumber(n)
                                                                 });
                                                             }
                                                         }}
                                                         disabled={this.state.isVerificationSent}
                                                         {...props} />
                                    <View style={styles.formButtonWrapper}>
                                        <Button
                                            disabled={!this.state.isValidPhoneNumber || this.state.isVerificationSent}
                                            title={translate("Send SMS confirmation")}
                                            onPress={async () => {
                                                console.log(props.values['phone_number']);
                                                this.setState({
                                                    isVerificationSent: true
                                                });
                                                try {
                                                    const result = await fetch(systemConfig.getWebUrl() + '/send-verification-code/', {
                                                        method: 'POST',
                                                        headers: {
                                                            Accept: 'application/json',
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            phone_number: props.values['phone_number']
                                                        }),
                                                    });
                                                    if (result.ok) {
                                                        const response = await result.json();
                                                        this.setState({
                                                            verificationCode: String(response.verification_code).padStart(5, '0')
                                                        });
                                                        return;
                                                    }
                                                    throw new Error(result.status);
                                                } catch (e) {
                                                    Alert.alert(translate("Error occurred!"));
                                                    this.setState({
                                                        isVerificationSent: false
                                                    });
                                                    console.log(e);
                                                }
                                            }}
                                        />
                                    </View>
                                    {this.state.isVerificationSent &&
                                    <>
                                        {/*TEST OUTPUT REMOVE BEFORE DEMO*/}
                                        <Text>SMS are off during development. Enter the code
                                            : {this.state.verificationCode}</Text>
                                        <TextInput
                                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                            onChangeText={text => {
                                                if (this.isCorrectVerificationCode(text)) {
                                                    console.log('Correct verification code has been entered!');
                                                    Keyboard.dismiss();
                                                    this.setState({
                                                        inputCode: text,
                                                        verificationCodeHasEntered: true
                                                    });
                                                    return
                                                }
                                                this.setState({
                                                    inputCode: text
                                                })
                                            }}
                                            placeholder={translate("SMS confirmation")}
                                            keyboardType='numeric'
                                            editable={!this.state.verificationCodeHasEntered}
                                            value={this.state.inputCode}
                                        />
                                        <View style={styles.formButtonWrapper}>
                                            <Button disabled={!this.state.verificationCodeHasEntered}
                                                    onPress={() => {
                                                        this.setState({
                                                            step: this.steps[1]
                                                        })
                                                    }}
                                                    title={translate("Next")}/>
                                        </View>
                                    </>
                                    }
                                    <Text>{"Errors : " + JSON.stringify(props.errors)}</Text>
                                    <Separator/>
                                    <Text>{"Touched : " + JSON.stringify(props.touched)}</Text>
                                    <Separator/>
                                    <Text>{"Values : " + JSON.stringify(props.values)}</Text>
                                    <Separator/>
                                </View>
                                }

                                {this.state.step === this.steps[1] &&
                                <View style={styles.formContainer}>
                                    <Text style={styles.header}>{translate("Step 2 :")}</Text>
                                    <Text
                                        style={styles.description}>{translate("Please add the personal data of the citizen: first name, second name, gender, date of birth and residential address")}</Text>
                                    <ValidatedTextInput name='last_name'
                                                        placeholder={translate("Last name")}
                                                        {...props}/>
                                    <ValidatedTextInput name='first_name'
                                                        placeholder={translate("First name")}
                                                        {...props}/>
                                    <ValidatedTextInput name='second_name'
                                                        placeholder={translate("Second name")}
                                                        {...props}/>

                                    <BlankSeparator/>
                                    <RadioButton.Group
                                        onValueChange={props.handleChange('gender')}
                                        value={props.values['gender']}
                                        name="gender"
                                    >
                                        <RadioButton.Item label={translate('Man')} value="M"/>
                                        <RadioButton.Item label={translate('Woman')} value="W"/>

                                        {props.touched['gender'] && props.errors['gender'] &&
                                        <Text style={{fontSize: 10, color: 'red'}}>{props.errors['gender']}</Text>
                                        }

                                    </RadioButton.Group>

                                    <BlankSeparator/>
                                    <ValidatedDateInput name='birth_date'
                                                        placeholder={translate("Birth date")}
                                                        handleDateChange={(d) => {
                                                            console.log('d:', d);
                                                            props.values['birth_date'] = d
                                                        }}
                                                        {...props}/>
                                    <BlankSeparator/>
                                    <ValidatedTextInput name='address'
                                                        placeholder={translate("Place of actual residence")}
                                                        numberOfLines={3}
                                                        {...props}/>
                                    <BlankSeparator/>
                                    <View style={styles.formButtonWrapper}>
                                        <Button disabled={!this.isSecondStepReady(props.values)}
                                                onPress={() => {
                                                    this.setState({
                                                        step: this.steps[2]
                                                    })
                                                }}
                                                title={translate("Next")}/>
                                    </View>
                                </View>
                                }

                                {this.state.step === this.steps[2] &&
                                <View style={styles.formContainer}>
                                    <Text style={styles.header}>{translate("Step 3 :")}</Text>
                                    <Text
                                        style={styles.description}>{translate("To continue registration, add series and number of  identity document, take a photo of the citizen")}</Text>
                                    {props.values.image && <Image
                                        source={props.values.image}
                                        style={{width: '100%', marginVertical: 5}}
                                    />}

                                    <View style={{alignItems: 'center'}}>
                                        <AwesomeIcon name="camera"
                                                     size={50}
                                                     color="#900"
                                                     onPress={this.handleImagePress.bind(self, props)}/>
                                    </View>

                                    <RadioButton.Group
                                        onValueChange={props.handleChange('doc_type')}
                                        value={props.values['doc_type']}
                                        name="doc_type"
                                    >
                                        <RadioButton.Item label={translate("Passport (old version)")} value="P"/>
                                        <RadioButton.Item label={translate("ID card")} value="C"/>
                                        <RadioButton.Item label={translate("Driver license")} value="D"/>

                                        {props.touched['doc_type'] && props.errors['doc_type'] &&
                                        <Text style={{fontSize: 10, color: 'red'}}>{props.errors['doc_type']}</Text>
                                        }
                                    </RadioButton.Group>
                                    <ValidatedTextInput name='document'
                                                        placeholder={translate("Document number")} {...props}/>
                                    <View style={styles.formButtonWrapper}>
                                        <Button disabled={!this.isThirdStepReady(props.values)}
                                                onPress={() => {
                                                    this.setState({
                                                        step: this.steps[3]
                                                    })
                                                }}
                                                title={translate("Next")}/>
                                    </View>
                                </View>
                                }

                                {this.state.step === this.steps[3] &&
                                <View style={styles.formContainer}>
                                    <Text style={styles.header}>{translate("Step 4 :")}</Text>
                                    <Text
                                        style={styles.description}>{translate("Please add citizen temperature information")}</Text>
                                    <ValidatedTextInput name='temperature'
                                                        placeholder={translate("Citizen's temperature")}
                                                        keyboardType='numeric'
                                                        {...props}/>

                                    <Separator/>
                                    <Button styles={styles.submit}
                                            onPress={props.handleSubmit}
                                            disabled={false}
                                            title={translate("Submit")}/>
                                </View>}
                            </View>
                        )}
                    </Formik>
                </ScrollView>

            </SafeAreaView>
        );

    }
}

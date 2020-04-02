import * as React from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import TextInput from 'react-native-paper/src/components/TextInput/TextInput';
import * as Yup from 'yup';
import Text from 'react-native-paper/src/components/Typography/Text';
import * as T from '../texts/Strings';
import {RadioButton} from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import GooglePlacesInput from '../components/Addresses';
function ValidatedTextInput(props) {
    let {name, values, handleChange, errors, setFieldTouched, touched, handleSubmit, placeholder,numberOfLines} = {...props};
    numberOfLines=numberOfLines?numberOfLines:13;

    return <>
        <TextInput
            onChangeText={handleChange(name)}
            value={values[name]}
            onBlur={setFieldTouched.bind(this, name)}
            placeholder={placeholder}
            name={name}
            mode="outlined"
            numberOfLines={numberOfLines}
        />
        {touched[name] && errors[name] &&
        <Text style={{fontSize: 10, color: 'red'}}>{errors[name]}</Text>
        }
    </>;
}


export default class RegisterScreen extends React.Component {

    _onRegisterPress = async () => {
        const result = await fetch('https://covid19.bitwager.app/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'test1',
                secondParam: 'test2',
            }),
        });
    };

    isValidDate=(s)=> {
        if (!s) return false;
        if (s.length!=10)return false;
        var bits = s.split('.');
        var y = bits[2],
            m = bits[1],
            d = bits[0];
        // Assume not leap year by default (note zero index for Jan)
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if ((!(y % 4) && y % 100) || !(y % 400)) {
            daysInMonth[1] = 29;
        }
        const result= !(/\D/.test(String(d))) && d > 0 && d <= daysInMonth[--m]
        console.log(result);
        return result;
    }


    SignUpSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, T.TOO_SHORT)
            .max(70, T.TOO_LONG)
            .required(T.REQUIRED),
        email: Yup.string()
            .email(T.WRONG_EMAIL),

        documentIsPassport: Yup.boolean()
            .required(T.DOCUMENT_TYPE_REQUIRED),
        doc_number: Yup.string()
            .min(8, T.TOO_SHORT)
            .max(12, T.TOO_LONG)
            .required(T.REQUIRED),
        doc_type: Yup.string()
            .required(T.REQUIRED),
        dob:Yup.string()
            .test("valid",T.WRONG_DATE,this.isValidDate),
    sex: Yup.string()
.required(T.REQUIRED),
        address:Yup.string()
            .required(T.REQUIRED),
        phone:Yup.string()
            .required(T.REQUIRED),
    });



render() {




        return (

            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Formik
                        initialValues={{email: ''}}
                        onSubmit={values => console.log(values)}
                        validationSchema={this.SignUpSchema}
                    >
                        {(props) => (
                            <View>
                                <AwesomeIcon name="camera" size={30} color="#900"/>
                                {/*{props.values.imageCaptured ? (<Image source={props.values.imageCaptured}></Image>) :*/}
                                {/*    (<Icon name="camera" size={30} color="#900" onPress={console.log('makePhoto')}/>)*/}
                                {/*}:*/}
                                <ValidatedTextInput name='doc_number' placeholder={T.DOC_NUMBER} {...props}/>
                                <RadioButton.Group
                                    onValueChange={props.handleChange('doc_type')}
                                    value={props.values['doc_type']}
                                    name="doc_type"
                                    style={{alignItems: 'stretch', flexDirection: 'row'}}
                                >
                                    <View>
                                        <Text>Паспорт</Text>
                                        <RadioButton value="passport"/>
                                    </View>
                                    <View>
                                        <Text>ID карта</Text>
                                        <RadioButton value="id"/>
                                    </View>

                                    <View>
                                        <Text>Права</Text>
                                        <RadioButton value="driver_licence"/>
                                    </View>
                                    {props.touched['doc_type'] && props.errors['doc_type'] &&
                                    <Text style={{fontSize: 10, color: 'red'}}>{props.errors['doc_type']}</Text>
                                    }
                                </RadioButton.Group>
                                <ValidatedTextInput name='email' placeholder="Email" {...props}/>
                                <ValidatedTextInput name='f_name' placeholder={T.LNAME} {...props}/>
                                <ValidatedTextInput name='l_name' placeholder={T.FNAME} {...props}/>
                                <ValidatedTextInput name='dob' placeholder={T.BIRTHDAY} {...props}/>
                                {/*гражданство*/}
                                <PhoneInput initialCountry="ua" forwardRef='phone' name='country'/>
                                <ValidatedTextInput name='phone' placeholder={T.PHONE} {...props}/>
                                <ValidatedTextInput name='address' numberOfLines={3} placeholder={T.ADDRESS} {...props}></ValidatedTextInput>
                                <RadioButton.Group
                                    onValueChange={props.handleChange('sex')}
                                    value={props.values['sex']}
                                    name="sex"
                                    style={{alignItems: 'stretch', flexDirection: 'row'}}
                                >
                                    <View>
                                        <Text>M</Text>
                                        <RadioButton value="m"/>
                                    </View>
                                    <View>
                                        <Text>Ж</Text>
                                        <RadioButton value="f"/>
                                    </View>

                                    {props.touched['sex'] && props.errors['sex'] &&
                                    <Text style={{fontSize: 10, color: 'red'}}>{props.errors['doc_type']}</Text>
                                    }

                                </RadioButton.Group>
                                <Button onPress={props.handleSubmit} title={T.SUBMIT}/>
                            </View>
                        )}
                    </Formik>
                </ScrollView>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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

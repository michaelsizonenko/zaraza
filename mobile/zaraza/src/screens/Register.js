import * as React from 'react';
import {Button, SafeAreaView, StyleSheet, View,ScrollView} from 'react-native';
import {ErrorMessage, Formik} from 'formik';
import TextInput from 'react-native-paper/src/components/TextInput/TextInput';
import * as Yup from 'yup';
import Text from 'react-native-paper/src/components/Typography/Text';
import * as T from '../texts/Strings';
import {RadioButton} from 'react-native-paper';

function ValidatedTextInput(props){
    const { name, values, handleChange, errors, setFieldTouched, touched, handleSubmit,placeholder }={...props};
    return <>
            <TextInput
                onChangeText={handleChange(name)}
                value={values[name]}
                onBlur={setFieldTouched.bind(this,name)}
                 placeholder={placeholder}
                 name={name}

            />
            {touched[name] && errors[name] &&
            <Text style={{fontSize: 10, color: 'red'}}>{errors[name]}</Text>
            }
        </>;
    }


export default class RegisterScreen extends React.Component {

    _onRegisterPress = async () => {
        const result = await fetch('https://covid19.bitwager.app/register', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'test1',
                secondParam: 'test2'
            })
        });
    };

    render() {

        const SignUpSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, T.TOO_SHORT)
                .max(70, T.TOO_LONG)
                .required(T.REQUIRED),
            email: Yup.string()
                .email(T.WRONG_EMAIL)
                .required(T.REQUIRED),
            documentIsPassport:Yup.boolean()
                .required(T.DOCUMENT_TYPE_REQUIRED),
            doc_number:Yup.string()
                .min(8, T.TOO_SHORT)
                .max(12, T.TOO_LONG)
                .required(T.REQUIRED),
            doc_type:Yup.string()
                .required(T.REQUIRED),

        });
        return (

                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Formik
                        initialValues={{ email: '' }}
                        onSubmit={values => console.log(values)}
                        validationSchema={SignUpSchema}
                    >
                        {(props) => (
                            <View>
                                <ValidatedTextInput name='doc_number' placeholder={T.DOC_NUMBER} {...props}/>

                                <ValidatedTextInput name='email' placeholder="Email" {...props}/>

                                <ValidatedTextInput name='email' placeholder="Email" {...props}/>
                                <ValidatedTextInput name='email' placeholder="Email" {...props}/>
                                <ValidatedTextInput name='email' placeholder="Email" {...props}/>
                                <ValidatedTextInput name='email' placeholder="Email" {...props}/>
                                <ValidatedTextInput name='email' placeholder="Email" {...props}/>

                                <RadioButton.Group
                                    onValueChange={props.handleChange('doc_type')}
                                    value={props.values['doc_type']}
                                    name="doc_type"
                                    style={{alignItems:'stretch',flexDirection: 'row'}}
                                >
                                    <View>
                                        <Text>Паспорт</Text>
                                        <RadioButton value="passport" />
                                    </View>
                                    <View>
                                        <Text>ID карта</Text>
                                        <RadioButton value="id" />
                                    </View>

                                    <View>
                                        <Text>Права</Text>
                                        <RadioButton value="driver_licence" />
                                    </View>
                                </RadioButton.Group>
                                {props.touched["doc_type"] && props.errors["doc_type"] &&
                                <Text style={{fontSize: 10, color: 'red'}}>{props.errors["doc_type"]}</Text>
                                }


                                <Button onPress={props.handleSubmit} title="Submit"/>
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
        fontSize: 20
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

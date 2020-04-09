import * as React from 'react';
import {Button, SafeAreaView, ScrollView, View, Text} from 'react-native';
import {Formik} from "formik";
import {styles} from '../styles/Styles';
import {ValidatedPhoneInput, ValidatedTextInput, Separator, BlankSeparator} from '../components/ValidatedInput';
import {L} from "../texts/Strings";
import * as Yup from "yup";


export default class ScreeningScreen extends React.Component {

    ScreeningSchema = Yup.object().shape({

    });

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Formik
                        onSubmit={this._onSubmit}
                        validationSchema={this.ScreeningSchema}
                    >
                        {(props) => (
                            <View style={styles.form}>

                                <ValidatedPhoneInput name='query'
                                                     {...props} />

                                <Text style={{margin: 10, fontSize: 18}}>Знайдено :</Text>
                                <Text style={{margin: 10}}>Іскендерова Ірина</Text>

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
    }
}


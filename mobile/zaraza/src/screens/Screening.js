import * as React from 'react';
import {Button, SafeAreaView, ScrollView, View, Text} from 'react-native';
import {Formik} from "formik";
import {styles} from '../styles/Styles';
import {ValidatedPhoneInput, ValidatedTextInput, Separator, BlankSeparator} from '../components/ValidatedInput';
import * as Yup from "yup";
import { translate } from "../config/AppConfig";


export default class ScreeningScreen extends React.Component {

    ScreeningSchema = Yup.object().shape({

    });

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Formik
                        initialValues={{'phone_number': '+380'}}
                        onSubmit={this._onSubmit}
                        validationSchema={this.ScreeningSchema}
                    >
                        {(props) => (
                            <View style={styles.form}>

                                <ValidatedPhoneInput name='phone_number'
                                                     {...props} />

                                <Text style={{margin: 10, fontSize: 18}}>Знайдено :</Text>
                                <Text style={{margin: 10}}>Іскендерова Ірина</Text>

                                <ValidatedTextInput name='temperature'
                                                    placeholder={translate('TEMPERATURE')}
                                                    keyboardType='numeric'
                                                    {...props}/>
                                <Separator/>
                                {/*<Text>{"Errors : " + JSON.stringify(props.errors)}</Text>*/}
                                {/*<Separator/>*/}
                                {/*<Text>{"Touched : " + JSON.stringify(props.touched)}</Text>*/}
                                {/*<Separator/>*/}
                                {/*<Text>{"Values : " + JSON.stringify(props.values)}</Text>*/}
                                {/*<Separator/>*/}
                                <Button styles={styles.submit} onPress={props.handleSubmit} title={translate('Submit')}/>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


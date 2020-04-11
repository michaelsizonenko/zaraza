import * as React from 'react'
import {Avatar, Card, IconButton, Title, Paragraph} from 'react-native-paper'
import {Formik} from 'formik'
import {styles} from '../styles/Styles'
import {systemConfig, translate} from '../config/AppConfig'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {ActivityIndicator, View, Button, Alert} from 'react-native'
import * as SearchService from '../services/SearchService'
import { ValidatedTextInput } from './ValidatedInput'
import * as Yup from 'yup'

const docs = {
    'P': 'Passport (old version)',
    'C': 'ID card',
    'D': 'Driver license',
}

const cardValidation =  Yup.object().shape({
  temperature: Yup.number()
    .min(34.2,translate(  "Too low"))
    .max(42.0,translate("Too high"))
    .required(translate('Required field'))
});

const isValidTemperature = (t) => {
    if (!t) {
        return false
    }
    return (t >= 34.0 && t <= 42.0)
}

export const SearchCard = (properties) => {
    const person = properties.person
    const toggleTemperature = (higher_props, person) => {
        person.showTemperature = !person.showTemperature
        signalChange(higher_props)
    }
    const toggleDetails = (higher_props, person) => {
        person.showDetails = !person.showDetails
        signalChange(higher_props)
    }

    const postTemperature = () => {
    }

    return (
        <Formik
            initialValues={{shown: false}}
            style={styles.searchItemContainer}
            onSubmit={postTemperature}
            validationSchema={cardValidation}
        >
            {(props) => {
                console.log(props)

                return (<Card>
                    <Card.Title
                        style={{margin: 10}}
                        title={`${person.last_name},${person.birth_date}`}
                        subtitle={`${person.first_name} ${person.second_name}`}
                        left={(props) => <Avatar.Icon
                            {...props}
                            style={person.gender === 'M' ? {backgroundColor: 'blue'} : {backgroundColor: 'red'}}
                            icon={person.gender === 'M' ? 'male' : 'female'}
                        />}
                        right={(icon_props) => (
                            <IconButton

                                icon={props.values.shown ? 'chevron-circle-up' : 'chevron-circle-down'}
                                onPress={() => {
                                    props.setFieldValue('shown', !props.values.shown)
                                }}
                                {...icon_props}
                            />)}
                    />
                    {props.values.shown &&
                    <><Card.Content>
                        <Title>{translate(docs[person.doc_type])}:{person.document}</Title>
                        <Title>{person.phone_number}</Title>
                        <Paragraph>{person.address}</Paragraph>


                    </Card.Content>
                        <Card.Cover source={{uri: `data:image/jpeg;base64,${person.image}`}}/>
                        <Card.Actions>
                            <View style={[styles.horizontal, styles.row]}>
                                <ValidatedTextInput name='temperature'
                                                    style={{width: "80%"}}
                                                    keyboardType={'numeric'}
                                                    placeholder={translate('Citizen\'s temperature')}
                                                    {...props}/>
                                <IconButton
                                    icon='edit'
                                    style={{width: 56, height: 56}}
                                    onPress={async () => {
                                        const result = await SearchService.setTemperature(person.hash, props.values.temperature)
                                        console.log(result.ok, result)
                                        if (result.ok && result.status === 201) {
                                            Alert.alert(translate("Temperature data submitted successfully"))
                                            props.setFieldValue('temperature', '')
                                            props.setFieldValue('shown', false)
                                            return
                                        }
                                        Alert.alert(translate('Error occurred!'))
                                    }}
                                />
                            </View>
                        </Card.Actions>
                    </>}
                </Card>)
            }}
        </Formik>)

}

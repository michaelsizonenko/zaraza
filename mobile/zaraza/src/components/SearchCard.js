import * as React from 'react'
import {Avatar, Card, IconButton, Title, Paragraph} from 'react-native-paper'
import {Formik} from 'formik'
import {styles} from '../styles/Styles'
import {systemConfig, translate} from '../config/AppConfig'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {ActivityIndicator, View, Button} from 'react-native'
import * as SearchService from '../services/SearchService'
import {ValidatedTextInput} from './ValidatedInput'

const docs = {
    'P': "Passport (old version)",
    'C': "ID card",
    'D': "Driver license",
}


function PhotoLoader(properties) {

    const values = properties.values;
    const getPhoto = async () => {
        values.setFieldValue('image', 'loading');

        values.setFieldValue('image', await SearchService.getImage(properties.hash))
    }
    if (!values.image)
        return <View style={{alignItems: 'center', height: 50}}>
            <AwesomeIcon name="camera"
                         size={50}
                         color="#900"
                         onPress={getPhoto}/>
        </View>

    values.image = 'loading'
    if (values.image)
        return (<Paragraph><View style={[styles.containerSpinner, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View></Paragraph>);

    return <Card.Cover source={{uri: `data:image/jpeg;base64,${values.image}`}}/>

}

const isValidTemperature = (t) => {
    if (!t) return false;
    return (t >= 34.0 && t <= 42.0);
}

export const SearchCard = (properties) => {
    const person = properties.person;
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
            initialValues={{opened: false, shown: false}}
            style={styles.searchItemContainer}
            onSubmit={postTemperature}
        >
            {(props) => {
                console.log(props);

                return (<Card>
                    <Card.Title
                        style={{margin: 10}}
                        title={`${person.last_name},${person.birth_date}`}
                        subtitle={`${person.first_name} ${person.second_name}`}
                        left={(props) => <Avatar.Icon {...props} icon={person.gender === 'M' ? 'male' : 'female'}/>}
                        right={(icon_props) => (
                            <IconButton

                                icon={props.values.shown ? "chevron-circle-up" : "chevron-circle-down"}
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
                        {/*<PhotoLoader hash={person.hash}{...props}/>*/}
                        {props.values.opened && (
                            <>
                                <ValidatedTextInput name='temperature'
                                                    keyboardType={'numeric'}
                                                    placeholder={translate('Citizen\'s temperature')}
                                                    {...props}/>
                                <View style={styles.formButtonWrapper}>
                                    <Button
                                        disabled={!isValidTemperature(props.values['temperature'])}
                                        title={translate("Submit temperature")}
                                        onPress={async () => {
                                            const result = await SearchService.setTemperature(person.hash, props.values.temperature)
                                            console.log(result);
                                        }}
                                    />
                                </View>
                            </>)}
                        <Card.Actions>
                            <IconButton icon='thermometer' onPress={() => {
                                props.setFieldValue('opened', !props.values.opened)
                            }}/>
                        </Card.Actions>
                    </>}
                </Card>);
            }}
        </Formik>);


};


const MyComponent = (properties) => (
    <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={(props) => <Avatar.Icon {...props} icon="folder"/>}
        right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {
        }}/>}
    />
);

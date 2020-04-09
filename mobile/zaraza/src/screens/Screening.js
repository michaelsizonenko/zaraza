import * as React from 'react'
import {Button, FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native'
import {Formik} from 'formik'
import {styles} from '../styles/Styles'
import {ValidatedTextInput} from '../components/ValidatedInput'
import * as Yup from 'yup'
import {translate} from '../config/AppConfig'
import {IconButton} from 'react-native-paper'


function SearchItem(props) {
    let person = props.person;
    this.toggleTemperature = (instance) => {
        instance.showTemperature = !instance.showTemperature;
    };
    this.postTemperature = () => {
    };

    return (
        <Formik style={styles.searchItemContainer}
                onSubmit={this.postTemperature} initialValues={{id: person.id}}>
            <Text>{person.first_name}  </Text>
            <Text>{person.second_name} </Text>
            <Text>{person.last_name}   </Text>
            <Text>{person.phone_number}</Text>
            <Text>{person.gender}      </Text>
            <Text>{person.doc_type}    </Text>
            <Text>{person.document}    </Text>
            <Text>{person.birth_date}  </Text>
            <Text>{person.address}     </Text>
            <IconButton name='thermometer' onClick={this.toggleTemperature.bind(this, person)}/>
            {person.showTemperature && (
                <>
                    <ValidatedTextInput name='temperature'
                                        placeholder={translate("Citizen's temperature")} {...props}/>
                    <IconButton name='submit' onPress={this.submitTemperature.bind(this, person)}/>
                </>)}
        </Formik>);

}

function SearchResult(props) {

    if (!props.searchItems) {
        return <Text>{translate("Run search to see locate citizen")}</Text>;
    }

    return (
        <FlatList
            scrollEnabled={true}
            data={props.searchItems}
            renderItem={({item}) => <SearchItem person={item}{...person}/>}
            keyExtractor={item => item.id}
        />)
}

export default class ScreeningScreen extends React.Component {

    ScreeningSchema = Yup.object().shape({});

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Formik
                        initialValues={{}}
                        onSubmit={this._onSubmit}
                        validationSchema={this.ScreeningSchema}
                    >
                        {(props) => (
                            <View style={styles.form}>
                                <View style={[styles.horizontal, styles.row]}>
                                    <ValidatedTextInput name='query'
                                                        {...props} style={styles.searchQuery}/>

                                    <IconButton icon='database-search' style={styles.searchButton}/>
                                </View>
                                <SearchResult/>


                                {/*<Text>{"Errors : " + JSON.stringify(props.errors)}</Text>*/}
                                {/*<Separator/>*/}
                                {/*<Text>{"Touched : " + JSON.stringify(props.touched)}</Text>*/}
                                {/*<Separator/>*/}
                                {/*<Text>{"Values : " + JSON.stringify(props.values)}</Text>*/}
                                {/*<Separator/>*/}
                                <Button styles={styles.submit} onPress={props.handleSubmit}
                                        title={translate('Submit')}/>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


import * as React from 'react'
import {Alert, Button, FlatList, SafeAreaView, ScrollView, Text, View, ActivityIndicator} from 'react-native'
import {Formik} from 'formik'
import {styles} from '../styles/Styles'
import {ValidatedTextInput} from '../components/ValidatedInput'
import * as Yup from 'yup'
import {setI18nConfig, systemConfig, translate} from '../config/AppConfig'
import {IconButton} from 'react-native-paper'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {SearchCard }from '../components/SearchCard'
import * as SearchService from '../services/SearchService'

setI18nConfig() // set initial config


function signalChange(props) {
    props.setFiledValue('change', !props.values.change);
}


function SearchResult(props) {

    if (!props.values.searchItems) {
        return <Text>{translate('Run search to locate citizen')}</Text>
    }

    return (
        <FlatList
            scrollEnabled={false}
            data={props.values.searchItems}
            renderItem={({item}) => <SearchCard person={item}{...props}/>}
            keyExtractor={item => item.hash}
        />)
}

export default class ScreeningScreen extends React.Component {

    ScreeningSchema = Yup.object().shape({})

    search = async (props, query) => {
        const data = await SearchService.search(props.values.query)
        props.setFieldValue('searchItems', data)
    }

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

                                    <IconButton icon='search' style={styles.searchButton}
                                                onPress={() => this.search(props)}/>
                                </View>
                                <SearchResult {...props}/>


                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


import * as React from 'react'
import { Alert, Button, FlatList, SafeAreaView, ScrollView, Text, View,ActivityIndicator} from 'react-native'
import { Formik } from 'formik'
import { styles } from '../styles/Styles'
import { ValidatedTextInput } from '../components/ValidatedInput'
import * as Yup from 'yup'
import { setI18nConfig, systemConfig, translate } from '../config/AppConfig'
import { IconButton } from 'react-native-paper'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {SearchCard }from '../components/SearchCard'

setI18nConfig() // set initial config


function signalChange (props) {
  props.setFiledValue('change',!props.values.change);
}


function SearchResult (props) {

  if (!props.values.searchItems) {
    return <Text>{translate('Run search to locate citizen')}</Text>
  }

  return (
    <FlatList
      scrollEnabled={false}
      data={props.values.searchItems}
      renderItem={({ item }) => <SearchCard person={item}{...props}/>}
      keyExtractor={item => item.hash}
    />)
}

export default class ScreeningScreen extends React.Component {

  ScreeningSchema = Yup.object().shape({})

  search = async (props, query) => {
    //
    // let data = [
    //   {
    //     'hash': '1988-10-22',
    //     'address': 'Эк пер 5 кв 71',
    //     'birth_date': '1988-10-22',
    //     'doc_type': 'P',
    //     'document': 'Км12344',
    //     'first_name': 'Михаил',
    //     'gender': 'M',
    //     'last_name': 'Сизоненко',
    //     'phone_number': '+380938359526',
    //     'second_name': 'Андреевич',
    //   },
    //   {
    //     'hash': '1990-10-24',
    //     'address': 'Эк пер 7 кв 71',
    //     'birth_date': '1990-10-24',
    //     'doc_type': 'P',
    //     'document': 'Ук578877',
    //     'first_name': 'Ирина',
    //     'gender': 'W',
    //     'last_name': 'Искендерова',
    //     'phone_number': '+380930127846',
    //     'second_name': 'Арифовна',
    //   },
    // ]
    const  data=await SearchService.search(props.values.query)
    props.setFieldValue('searchItems', data)

  }

  render () {
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

                  <IconButton icon='search' style={styles.searchButton} onPress={() => this.search(props)}/>
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


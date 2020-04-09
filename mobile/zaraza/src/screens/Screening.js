import * as React from 'react'
import { Alert, Button, FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native'
import {Formik} from 'formik'
import {styles} from '../styles/Styles'
import {ValidatedTextInput} from '../components/ValidatedInput'
import * as Yup from 'yup'
import { setI18nConfig, systemConfig, translate } from '../config/AppConfig'
import {IconButton} from 'react-native-paper'
setI18nConfig(); // set initial config

function SearchItem(props) {
    let person = props.person;
    const toggleTemperature = (instance) => {
        instance.showTemperature = !instance.showTemperature;
    };
    this.postTemperature = () => {
    };

    return (
        <Formik style={styles.searchItemContainer}
                onSubmit={this.postTemperature} initialValues={{id: person.id}}>
          {(props)=>(
            <>
            <Text>{person.first_name}  </Text>
            <Text>{person.second_name} </Text>
            <Text>{person.last_name}   </Text>
            <Text>{person.phone_number}</Text>
            <Text>{person.gender}      </Text>
            <Text>{person.doc_type}    </Text>
            <Text>{person.document}    </Text>
            <Text>{person.birth_date}  </Text>
            <Text>{person.address}     </Text>
            <IconButton name='thermometer' onClick={toggleTemperature.bind(this, person)}/>
            {person.showTemperature && (
                <>
                    <ValidatedTextInput name='temperature'
                                        placeholder={translate("Citizen's temperature")} {...props}/>
                    {/*<IconButton name='submit' onPress={x=>x}/>*/}
                </>)}
</>)}
        </Formik>);

}

function SearchResult(props) {

    if (!props.values.searchItems) {
        return <Text>{translate("Run search to locate citizen")}</Text>;
    }

    return (
        <FlatList
            scrollEnabled={true}
            data={props.values.searchItems}
            renderItem={({item}) => <SearchItem person={item}{...props}/>}
            keyExtractor={item => item.id}
        />)
}

export default class ScreeningScreen extends React.Component {

    ScreeningSchema = Yup.object().shape({});

     search=async (props,query)=>{


      let data= [
        {
          "address": "Эк пер 5 кв 71",
          "birth_date": "1988-10-22",
          "doc_type": "P",
          "document": "Км12344",
          "first_name": "Михаил",
          "gender": "M",
          "last_name": "Сизоненко",
          "phone_number": "+380938359526",
          "second_name": "Андреевич"
        },
        {
          "address": "Эк пер 7 кв 71",
          "birth_date": "1990-10-24",
          "doc_type": "P",
          "document": "Ук578877",
          "first_name": "Ирина",
          "gender": "W",
          "last_name": "Искендерова",
          "phone_number": "+380930127846",
          "second_name": "Арифовна"
        }
      ];
      props.setFieldValue('searchItems',data)


      };

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

                                    <IconButton icon='search' style={styles.searchButton} onPress={()=>this.search(props)}/>
                                </View>
                                <SearchResult {...props}/>


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


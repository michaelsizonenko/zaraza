import * as React from 'react'
import { Avatar, Card, IconButton,Title,Paragraph } from 'react-native-paper'
import { Formik } from 'formik'
import { styles } from '../styles/Styles'
import {  systemConfig, translate } from '../config/AppConfig'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ActivityIndicator, View } from 'react-native'
import * as SearchService from '../services/SearchService'
import {ValidatedTextInput} from './ValidatedInput'

const  docs={
  'P':  "Passport (old version)",
  'C':  "ID card",
  'D':  "Driver license",
}
// <Formik
// initialValues={{opened:false}}
// style={styles.searchItemContainer}
// onSubmit={postTemperature}
// initialValues={{ id: person.id }}>
// {(props)=>(
//   <View>
//     <PhotoLoader  hash={person.hash}{...props}/>
//     <Text>{person.last_name} {person.first_name} {person.second_name}   </Text>
//     <Text>{person.phone_number}</Text>
//     <AwesomeIcon name={person.gender=='M'?'male':'female'}/>
//     <Text>{translate(docs[person.doc_type])}:{person.document} </Text>
//     <Text>{person.birth_date}  </Text>
//     <Text>{person.address}     </Text>
//     <IconButton icon='thermometer' onPress={()=>{props.setFieldValue('opened',!props.values.opened)}}/>
//     {props.values.opened && (
//       <>
//         <ValidatedTextInput name='temperature'
//                             placeholder={translate('Citizen\'s temperature')} {...higher_props}/>
//         <IconButton icon='submit' onPress={x=>x}/>
//       </>)}
//   </View>)}
// </Formik>)
//
//


function PhotoLoader(properties) {

  const  values=properties.values;
  const getPhoto = async()=>
  {
    values.setFieldValue('image', 'loading');

    values.setFieldValue('image', await SearchService.getImage(properties.hash))
  }
  if (!values.image)
    return <View style={{alignItems: 'center',height:50}}>
      <AwesomeIcon name="camera"
                   size={50}
                   color="#900"
                   onPress={getPhoto}/>
    </View>


  if (values.image='loading')
    return (<Paragraph><View style={[styles.containerSpinner, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff"/>
    </View></Paragraph>);

  return <Card.Cover source={{uri: `data:image/jpeg;base64,${values.image}`}}/>

}


export const SearchCard = (properties) => {
  const  person=properties.person;
  const toggleTemperature = (higher_props,person) => {
    person.showTemperature = !person.showTemperature
    signalChange(higher_props)
  }
  const toggleDetails = (higher_props,person) => {
    person.showDetails = !person.showDetails
    signalChange(higher_props)
  }


  const postTemperature = () => {
  }

  async function sendTemperature (props) {
    const result=await SearchService.setTemperature(props.peson.hash,props.values.temperature)
    //TODO:show something;
  }

  return(

<Formik
initialValues={{opened:false,shown:false}}
style={styles.searchItemContainer}
onSubmit={postTemperature}
>
{(props)=>{
console.log(props);

 return (<Card>
      <Card.Title
        style={{margin:10}}
        title={`${person.last_name},${person.birth_date}`}
        subtitle={`${person.first_name} ${person.second_name}`}
        left={(props) => <Avatar.Icon {...props} icon={person.gender=='M'?'male':'female'}/>}
        right={(icon_props) => (
          <IconButton

            icon={props.values.shown?"chevron-circle-up":"chevron-circle-down"}
            onPress={() => {props.setFieldValue('shown',!props.values.shown)}}
            {...icon_props}
          />)}
      />
   {props.values.shown&&
   <><Card.Content>
        <Title>{translate(docs[person.doc_type])}:{person.document}</Title>
        <Title>{person.phone_number}</Title>
        <Paragraph>{person.address}</Paragraph>


   </Card.Content>
     <PhotoLoader  hash={person.hash}{...props}/>
     {props.values.opened && (
      <>
        <ValidatedTextInput name='temperature'
                            placeholder={translate('Citizen\'s temperature')}
                            {...props}/>
        <IconButton icon='check-square' onPress={sendTemperature(props)}/>
      </>)}
      <Card.Actions>
        <IconButton icon='thermometer' onPress={()=>{props.setFieldValue('opened',!props.values.opened)}}/>
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
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
  />
);

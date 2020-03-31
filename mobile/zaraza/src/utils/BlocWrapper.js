import BlocBuilder from "bloc-builder-react";
import * as React from "react";


let BlocWrapper=(subject,Component)=> {

    class HOC extends React.Component {
        render() {


    return (
        <BlocBuilder
            //setting to the BlocBuilder our Subject
            subject={subject}
            //builder function that will render our JSX when the subject receives a new value
            builder={(snapshot) => {

                return (<Component data={snapshot}/>);
            }}
        />)

        }
    }
return HOC;
}
export default BlocWrapper;
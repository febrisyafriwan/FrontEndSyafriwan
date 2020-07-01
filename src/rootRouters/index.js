import React from 'react';
import RouterContact from "../containers/contact/Router"
import {
    NavigationContainer
} from '@react-navigation/native';
class Routers extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
        <NavigationContainer>
        <RouterContact/>
        </NavigationContainer>
        )
    }
}
export default function funcRouters(props) {

    return <Routers {...props} />;
}
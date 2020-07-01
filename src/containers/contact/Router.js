import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ViewContact from '../contact/ViewContact';
import AddContact from '../contact/AddContact';
import EditContact from '../contact/EditContact'
const RootStack = createStackNavigator();
const RouterContact = () => {
    return (
        <RootStack.Navigator >
            <RootStack.Screen name="Contact" component={ViewContact} />
            <RootStack.Screen name="AddContact"  options={{ title:'Add Contact' }}component={AddContact} />
            <RootStack.Screen name="EditContact"  options={{ title:'Edit Contact' }}component={EditContact} />
        </RootStack.Navigator>
    );
};

export default RouterContact;
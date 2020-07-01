import * as React from 'react';
import {
    View,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    Image,
    Button,
    Alert,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import {
    addAccount,
} from "./Action";
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
class AddContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            age: 0,
            firstname_valid_input: false,
            lastname_valid_input: false,
            age_valid_input: false,
            filePath: {},
            showAlert: false
        };
    }
    componentDidMount() {


    }
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps')
        if (props.ReducerContact.action === 'addAccountSuccess') {
            return {
                showAlert: true
            }
        } else if (props.ReducerContact.action === 'addAccountFailed') {
            return {
                showAlert: true
            }
        }
    }
        handleFirstNameChange = (val) => {
            if (val.length > 3) {
                this.setState({
                    firstname: val,
                    firstname_valid_input: true
                });
            } else {
                this.setState({
                    firstname: val,
                    firstname_valid_input: false
                });
            }
        }
        handleLastNameChange = (val) => {
            if (val.length > 3) {
                this.setState({
                    lastname: val,
                    lastname_valid_input: true
                });
            } else {
                this.setState({
                    lastname: val,
                    lastname_valid_input: false
                });
            }
        }
        handleAgeChange = (val) => {
            if (val <= 200) {
                this.setState({
                    age: val,
                    age_valid_input: true
                });
            } else {
                this.setState({
                    age: val,
                    age_valid_input: false
                });
            }
        }
        chooseFile = () => {
            let options = {
                title: 'Select Image',

                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            ImagePicker.showImagePicker(options, response => {

                if (response.didCancel) {

                } else if (response.error) {

                } else if (response.customButton) {

                } else {
                    let source = response;

                    this.setState({
                        filePath: source,
                    });
                }
            });
        };
        Add = () => {
            const { firstname,
                lastname,
                age,
                filePath, } = this.state

            let body = {
                firstName: firstname,
                lastName: lastname,
                age: age,
                photo: filePath.uri
            }

            this.props.addAccount(body);
        }
        Alert = () => {
            Alert.alert(
                //title
                'Information',
                //body
                `${this.props.ReducerContact.message}`,
                [
                    { text: 'Ok', onPress: () => this.props.navigation.navigate('Contact') },
                ],
                { cancelable: false }
            );
    
        }
        render() {
            const { firstname_valid_input,
                lastname_valid_input,
                age_valid_input,
                filePath,
                firstname,
                lastname,
                age } = this.state

            return (
                <View style={styles.container}>
                    <ScrollView>

                        <View style={styles.action}>
                            <TextInput
                                placeholder="Firstname (min 3 alphabet)"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: '666666'
                                }]}
                                autoCapitalize="none"
                                value={firstname}
                                onChangeText={(val) => this.handleFirstNameChange(val)}
                            />
                            {firstname_valid_input ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null
                            }
                        </View>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Lastname (min 3 alphabet)"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: '#666666'
                                }]}
                                autoCapitalize="none"
                                value={lastname}
                                onChangeText={(val) => this.handleLastNameChange(val)}
                            />
                            {lastname_valid_input ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null
                            }
                        </View>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Age (max 200)"
                                keyboardType={'numeric'}
                                numeric
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: '#666666'
                                }]}
                                value={age}
                                autoCapitalize="none"
                                onChangeText={(val) => this.handleAgeChange(val)}
                            />
                            {age_valid_input ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null
                            }
                        </View>

                        <Button title="Choose Photo" onPress={this.chooseFile.bind(this)} />
                        <View style={styles.image}>

                            <Image
                                source={{ uri: filePath.uri }}
                                style={{ width: '100%', height: 300, borderRadius: 200 }}
                            />

                        </View>
                    </ScrollView>
                    <View>
                        {firstname_valid_input && lastname_valid_input && age_valid_input && filePath.uri ?
                            <Button
                                title="OK"
                                onPress={() => this.Add()}
                            /> :
                            <Button
                                title="Ok"
                                disabled
                                onPress={() => this.Add()}
                            />
                        }

                    </View>
                    {this.state.showAlert && this.Alert()}
                    {this.props.ReducerContact.isLoading && <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}


                </View>
            );
        }
    }
    
function mapStateToProps(state) {
    console.log(state.ReducerContact.action);
    return {
        ReducerContact: state.ReducerContact
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addAccount: value => dispatch(addAccount(value)),
    };
};

function funcAdd(props) {

    return <AddContact {...props} />;
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(funcAdd);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12
    },
    loading: {
        top: '50%',
        left: '50%',
        position: 'absolute'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    image: {
        alignItems: 'center',
        padding: 10
    }
});
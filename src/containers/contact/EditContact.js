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
    editAccount,
} from "./Action";
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
class EditContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.route.params.firstName ? this.props.route.params.firstName : '',
            lastname: this.props.route.params.lastName ? this.props.route.params.lastName : '',
            age: this.props.route.params.age ?parseInt(this.props.route.params.age)   : 0,
            id:this.props.route.params.id ? this.props.route.params.id : '',
            firstname_valid_input: false,
            lastname_valid_input: false,
            age_valid_input: false,
            filePath: {},
            imageChange:false,
            showAlert: false,
            action:null
            
        };
    }
    componentDidMount() {
        this.handleAgeChange(this.state.age.toString());
        this.handleFirstNameChange(this.state.firstname.toString());
        this.handleLastNameChange(this.state.lastname.toString())

    }
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps')
        if (props.ReducerContact.action === 'editAccountSuccess'&& state.action !== props.ReducerContact.action) {
            return {
                showAlert: true,
                action:props.ReducerContact.action
            }
        }
        if (props.ReducerContact.action === 'editAccountFailed'&& state.action !== props.ReducerContact.action) {
            return {
                showAlert: true,
                action:props.ReducerContact.action
            }
        }
        if (props.ReducerContact.action === 'editAccountError'&& state.action !== props.ReducerContact.action) {
            return {
                showAlert: true,
                action:props.ReducerContact.action
            }
        }
    }

    handleFirstNameChange = (val) => {
        if (val.length >3) {
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
        if (val.length >3) {
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
        if (val<=200) {
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
                    imageChange:true
                });
            }
        });
    };
    Edit = () => {
        const { firstname,
            lastname,
            age,
            filePath, 
            id,
            imageChange
        } = this.state

        let body = {
            data:{
                firstName: firstname,
                lastName: lastname,
                age: age,
                photo: this.props.route.params.photo && !imageChange ? this.props.route.params.photo : filePath.uri
            },
            id:id    
        }
        console.log(body)
        this.props.editAccount(body);
    }
    movePage = ()=>{
        this.setState({showAlert:false});
        this.props.navigation.navigate('Contact')
    }
    Alert = () => {
        Alert.alert(
            //title
            'Information',
            //body
            `${this.props.ReducerContact.message}`,
            [
                { text: 'Ok', onPress: () => this.movePage()},
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
            age,
            imageChange } = this.state

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
                            placeholder="Age (max > 200)"
                            keyboardType={'numeric'}
                            numeric
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: '#666666'
                            }]}
                            value={age.toString()}
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

                        {
                            this.props.route.params.photo && !imageChange? <Image
                                source={{ uri: this.props.route.params.photo }}
                                style={{ width: '100%', height: 300, borderRadius: 200 }}
                            /> : <Image
                                    source={{ uri: filePath.uri }}
                                    style={{ width: '100%', height: 300, borderRadius: 200 }}
                                />
                        }
                    </View>
                </ScrollView>
                <View>
                    {firstname_valid_input && lastname_valid_input && age_valid_input && (filePath.uri || this.props.route.params.photo) ?
                        <Button
                            title="OK"
                            onPress={() => this.Edit()}
                        /> :
                        <Button
                            title="Ok"
                            disabled
                            onPress={() => this.Edit()}
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
        editAccount: value => dispatch(editAccount(value)),
    };
};

function funcEdit(props) {

    return <EditContact {...props} />;
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(funcEdit);

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
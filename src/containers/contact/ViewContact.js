import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Card from './component/Card';
import Feather from 'react-native-vector-icons/Feather';
import { getAllAccount, deleteAccount, getAccountById, restartAction } from './Action'
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { NavigationEvents } from '@react-navigation/native';

console.disableYellowBox = true;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

class ViewContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            refreshing: false,
            failed: false
        };

    }

    componentDidMount() {
        this.props.getAllAccount()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.getAllAccount()
        });
    }
    componentWillmount() {
        this._unsubscribe();
    }
    static getDerivedStateFromProps(props, state) {
        if (props.ReducerContact.action === 'getAllAccountFailed') {
            return {
                failed: true
            }
        } else if (props.ReducerContact.action === 'getAllAccountSuccess') {
            return {
                failed: false
            }
        }
      
    }

    setAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 250,
            update: {
                type: LayoutAnimation.Types.easeIn,
                springDamping: 0.7,
            },
        });
        LayoutAnimation.configureNext({
            duration: 500,
            create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
        });
    };
    removeItem = key => {
        this.props.deleteAccount(key)
    };
    onRefresh = () => {
        this.props.getAllAccount()
    }
    renderItem = ({ item }) => <Card item={item} removeItem={this.removeItem} props={this.props} />;
    failedAlert = () => {
        Alert.alert(
            //title
            'Information',
            //body
            `${this.props.ReducerContact.message}`,
            [
                { text: 'Ok', onPress: () => console.log() },
            ],
            { cancelable: false }
        );

    }
    _onChangeSearch = query => this.setState({ searchQuery: query });
    render() {
        const {
            searchQuery,
            dataContact,
            refreshing
        } = this.state;
        const {
            ReducerContact,
            navigation
        } = this.props
        return (

            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <Searchbar
                        placeholder="Search by id"
                        onChangeText={this._onChangeSearch}
                        value={searchQuery}
                    />

                    <FlatList
                        data={ReducerContact.dataContact}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id.toString()
                        }
                        refreshControl={<RefreshControl refreshing={ReducerContact.isLoading} onRefresh={this.onRefresh.bind(this)} />}
                    />

                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddContact')}
                    style={styles.button}
                >
                    <Feather
                        name="plus"
                        color="white"
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.getAccountById(this.state.searchQuery)}
                    style={styles.buttonSearch}
                >
                    <Feather
                        name="search"
                        color="white"
                        size={20}
                    />
                </TouchableOpacity>
                {this.state.failed && this.failedAlert()}

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
        getAllAccount: () => dispatch(getAllAccount()),
        deleteAccount: (val) => dispatch(deleteAccount(val)),
        getAccountById: (val) => dispatch(getAccountById(val)),
        restartAction: () => dispatch(restartAction())
    };
};
function funcViewContact(props) {
    const navigation = useNavigation();
    return <ViewContact {...props} navigation={navigation} />;
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(funcViewContact);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    addButton: {
        width: '100%',
        elevation: 3,
        backgroundColor: '#808080',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    addIcon: {
        color: 'white',
        padding: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 70,
        backgroundColor: '#ee6e73',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    buttonSearch: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 70,
        backgroundColor: '#ee6e73',
        position: 'absolute',
        bottom: 70,
        right: 10,
    },
    loading: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
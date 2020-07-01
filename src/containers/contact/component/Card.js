import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Animated,
    Alert
} from 'react-native';


import Swipeout from 'react-native-swipeout';
export default class Card extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        const { removeItem, item, props } = this.props;
        const { id, firstName, lastName, age, photo } = item;
        let swipeBtns = [
            {
                text: 'Edit',
                backgroundColor: 'orange',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => {
                    props.navigation.navigate('EditContact', {
                        firstName: firstName,
                        lastName: lastName,
                        age: age,
                        photo:photo,
                        id:id
                    })
                }
            },
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { removeItem(id) }
            }

        ];
        return (
            <Animated.View style={{ flex: 1, padding: 10 }}>
                <Swipeout right={swipeBtns}
                    autoClose='true'
                    backgroundColor='transparent'>
                    <View style={styles.container}>
                        <View style={styles.itemRow}>
                            {photo == 'N/A' || !photo? <Image
                                source={require('../../../assets/anonim.jpg')}
                                style={styles.image}
                            /> :
                                <Image style={styles.image} source={{ uri: photo }} />}
                            <View style={styles.descContainer}>
                                <View style={styles.descContent}>
                                    <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
                                    <View style={styles.contentAge}>
                                        <Text style={styles.descTitle}>Age : </Text>
                                        <Text style={styles.description}>{age}</Text>
                                    </View>
                                    <View style={styles.contentId}>
                                        <Text style={styles.descTitle}>ID : </Text>
                                        <Text style={styles.description}>{id}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Swipeout>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        padding: 10,
        backgroundColor: '#E0FFFF'
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
    },
    descContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    image: {
        width: 50,
        height: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    descContent: {
        marginLeft: 10,
    },
    contentAge: {
        flexDirection: 'row',
        alignItems: 'center',
     
    },
    contentId: {
        flexDirection: 'row',
        alignItems: 'flex-start',
 
    },
    name: {
        color: '#5F9EA0',
        fontSize: 15,
        fontWeight: '700',
    },
    description: {
        flex: 1,
        fontSize: 12,
        color: '#696969',
        fontWeight: '700',
    },
    descTitle: {
        fontSize: 12,
        color: '#696969',
        fontWeight: '700',
    }
});
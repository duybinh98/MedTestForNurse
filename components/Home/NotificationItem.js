import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import ScreenBackGround from './../Common/ScreenBackGround';

export default class NotificationItem extends Component {
    render(){
        const _content = this.props.content;
        return(
            <TouchableOpacity 
                style={styles.notificationItem}
                onPress={() => this.props.navigation.navigate('HomeScreen')}
                >
                    <Text style={styles.articleShortContent}>{_content}</Text>                  
            </TouchableOpacity>        
        );
    }
}
const styles = StyleSheet.create({
    notificationItem:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:1,
        paddingBottom:5, 
        paddingLeft:10,       
        borderRadius:10,
        marginBottom:10,
        
    },
    articleShortContent:{
        fontSize:13
    }
});
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import ScreenBackGround from './../Common/ScreenBackGround';
import {getApiUrl} from './../Common/CommonFunction'

export default class NotificationItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestId: this.props.requestId? this.props.requestId: '-1',            
            testsList: [],
            token: this.props.token,
            content: this.props.content,
        };
        this.onItemPress = this.onItemPress.bind(this)
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.route.params !== this.props.route.params) {
    //         this.setState(previousState => ({
    //             requestId: this.props.requestId? this.props.requestId: '-1',     
    //             token: this.props.token,
    //             content: this.props.content,
    //         }));
    //     }
    // }

    onItemPress(){
        fetch(getApiUrl()+'/requests/detail/'+this.state.requestId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+this.state.token,
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                result.message ? null: 
                this.props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'RequestViewScreen',
                    params: {
                        requestId: result.requestID,
                        name: result.customerName,
                        address: result.requestAddress,
                        phone: result.customerPhoneNumber,
                        dob: result.customerDOB,
                        date: result.requestMeetingTime,
                        selectedTest: result.lsSelectedTest,   
                        status: result.requestStatus,
                        testsList: this.props.testsList,
                        totalAmount: result.requestAmount,
                        backScreen: 'NotificationListScreen'
                    },
                }))
            },            
            (error) => {
                console.log(error)
            }
        )  
    }


    render(){
        return(
            <TouchableOpacity 
                style={styles.notificationItem}
                onPress={() => this.onItemPress()}
                >
                    <Text style={styles.articleShortContent}>{this.state.content}</Text>                  
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
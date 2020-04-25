import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {Button} from 'react-native-elements';
import {convertDateTimeToDate, convertDateTimeToTime, getStateName, getStateColor, convertMoney} from './../Common/CommonFunction'

export default class RequestListPendingItem extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            appointment_date: convertDateTimeToDate(this.props.appoint_date),
            appointment_time: convertDateTimeToTime(this.props.appoint_date),
        };
    }
    componentDidMount(){
          
    }



    render(){        
        return(
            <View>            
            <TouchableOpacity 
                style={styles.requestListItem}
                // onPress={() => {this.props.onPressItem()}}
                onPress={() => {
                    this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'RequestViewScreen',
                            params: {
                                requestId: this.props.requestId,
                                name: this.props.cust_name,
                                address: this.props.appoint_address,
                                phone: this.props.cust_phone,
                                dob: this.props.cust_DOB,
                                date: this.props.appoint_date,
                                selectedTest: this.props.selectedTest,   
                                status: this.props.req_status,
                                testsList: this.props.testList,
                                totalAmount: this.props.req_amount,
                                // customerInfo  = this.state.customerInfo,
                            },
                        })
                    )
                    // this.onConfirm
                    }}
            
            >                
                <View style={[styles.requestListTextContainer,{
                    paddingTop:10,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                }]}>
                    <View>
                    <Text style={{fontSize:17}}>{this.props.cust_name}</Text>
                    </View>
                    <View>
                    <Text style={{fontSize:15}}>{convertMoney(this.props.req_amount)+' đ'}</Text>
                    </View>
                </View>   
                <View style={styles.requestListTextContainer}>
                    <Text style={{fontSize:17}}>{"Ngày hẹn: "+convertDateTimeToDate(this.props.appoint_date)+"   "+convertDateTimeToTime(this.props.appoint_date)}</Text>
                </View>     
                <View style={styles.requestListTextContainer}>
                    <Text style={{fontSize:17}}>{"Trạng thái: "+getStateName(this.props.req_status)}</Text>
                </View>           
                <View style={[styles.requestListTextContainer,{
                    paddingBottom:10,
                }]}>
                    <Text style={{fontSize:15}}>{"Địa chỉ: "+this.props.appoint_address}</Text>
                </View>               
            </TouchableOpacity>             
            </View> 
        );
    }
}
const styles = StyleSheet.create({
    requestListItem:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom:2,       
        borderRadius:10,
        marginBottom:10, 
    },
    requestListTextContainer:{
        alignSelf: 'stretch',
        width:Dimensions.get('window').width-20,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:3,
        paddingTop:3,
    }

});
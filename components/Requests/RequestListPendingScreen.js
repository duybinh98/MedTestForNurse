import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import RequestListPendingItem from './RequestListPendingItem';
import requestsList from './../../Data/RequestsList'
import testList from './../../Data/Test'


export default class RequestListPendingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRightButtonSelected: false,
            Button1Selected: true,
            Button2Selected: false,
            dataChanged: true,
            requestList: this.props.route.params.requestPendingList? this.props.route.params.requestPendingList : [],
        };
        this.sortByCreateTime = this.sortByCreateTime.bind(this);
        this.sortByAppointmentTime = this.sortByAppointmentTime.bind(this);
    }
    
    componentDidMount(){
        this.setState(previousState => ({ 
            requestList: this.sortByCreateTime(),
        }));
    }

    componentDidUpdate  (prevProps, prevState) {
         if (prevProps.route.params.requestPendingList !== this.props.route.params.requestPendingList) {
            this.setState(previousState => ({ 
                requestList: this.props.route.params.requestPendingList? this.props.route.params.requestPendingList : [],
            }));
        }
    }


    CallApiGetRequestPendingList(){
        fetch(getApiUrl()+"/request/list")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState(previousState => ({
                requestList: result,
            }));
            },            
            (error) => {
            this.setState({
                error
            });
            }
        )
    }


    sortByCreateTime(){
        const _requestList = this.state.requestList;
        _requestList.sort((a, b) => a.request_createTime.localeCompare(b.request_createTime))
        return _requestList;
    }

    sortByAppointmentTime(){
        const _requestList = this.state.requestList;
        _requestList.sort((a, b) => a.appoint_date.localeCompare(b.appoint_date))
        return _requestList;
    }


    render(){
        
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen="HomeScreen"></ScreenTopMenuBack>
                    <View 
                        style ={styles.background}>            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Tìm đơn xét nghiệm</Text>
                        </View>
                        <View style = {{flex:1}}>
                            <View style={[styles.titleArea,{
                                height:60,
                                marginBottom:10
                                }]}>     
                                <TouchableOpacity
                                    onPress={() => this.setState(previousState => ({ 
                                        Button1Selected: true,
                                        Button2Selected: false,
                                        dataChanged: !this.state.dataChanged,
                                    }))}
                                    style ={[styles.mainButton,{
                                        backgroundColor:this.state.Button1Selected?'#6fc02d':'#b1de8c',
                                        borderWidth:this.state.Button1Selected? 3:0,
                                        borderBottomLeftRadius:10,
                                        borderTopLeftRadius:10
                                    }]}                                
                                    >
                                    <Text style={{fontSize:18}}>Đơn vừa tạo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState(previousState => ({ 
                                        Button1Selected: false,
                                        Button2Selected: true,
                                        dataChanged: !this.state.dataChanged,
                                    }))}
                                    style ={[styles.mainButton,{
                                        backgroundColor:this.state.Button2Selected?'#fba739':'#fccd90',
                                        borderWidth:this.state.Button2Selected? 3:0,
                                        borderBottomRightRadius:10,
                                        borderTopRightRadius:10                           
                                    }]}                                
                                    >
                                    <Text style={{fontSize:18}}>Lấy mẫu sớm nhất</Text>
                                </TouchableOpacity>                    
                            </View>
                            <FlatList style={{                    
                                flex:1
                                }}
                                showsVerticalScrollIndicator={false}
                                data={this.state.Button1Selected ? this.sortByCreateTime(): this.sortByAppointmentTime()}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => {
                                        return (
                                            <View>                                
                                            <RequestListPendingItem
                                                request_createTime={item.request_createTime}
                                                cust_name={item.cust_name}
                                                cust_phone={item.cust_phone}
                                                cust_DOB={item.cust_DOB}
                                                appoint_address={item.appoint_address}
                                                appoint_date={item.appoint_date}
                                                nurse_name={item.nurse_name}
                                                nurse_id={item.nurse_id}
                                                selectedTest={item.selectedTest}
                                                req_amount={item.req_amount}
                                                req_status={item.req_status}
                                                testList={testList}
                                                navigation={this.props.navigation}                                                
                                            />   
                                            </View>                             
                                        );
                                    }}
                                >                   
                            </FlatList>
                        </View>
                    </View>
                    
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
                </View>  
        );
    }
}





const styles = StyleSheet.create({
    background:{
        flex:1, 
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleArea:{
        height: 50,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        marginTop:15,
        marginBottom:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:3,
        borderRadius:10
    },
    mainButton:{
        width:157,
        height:33,        
        justifyContent:'center',
        alignItems:'center',  
        borderColor:'black'
    },    
});
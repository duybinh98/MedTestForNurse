import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import RequestListPendingItem from './RequestListPendingItem';
import requestsList from './../../Data/RequestsList'
import testList from './../../Data/Test'
import {getApiUrl} from './../Common/CommonFunction'


class RequestListHistoryScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nurseId: this.props.nurseInfor? this.props.nurseInfor.id: '-1',
            isRightButtonSelected: false,
            Button1Pressed: true,
            Button2Pressed: false,
            dataChanged: true,
            requestList: [],
            testsList: [],
        };
        this.sortByCreateTime = this.sortByCreateTime.bind(this);
        this.sortByCompletedTime = this.sortByCompletedTime.bind(this);
    }
    
    componentDidMount(){
        this.callApiGetRequestHistoryList();
        this.callApiTestList();
        this.props.navigation.addListener("focus", () => {
            this.callApiGetRequestHistoryList();
        })
    }

    // componentDidUpdate  (prevProps, prevState) {
    //      if (prevProps.route.params.requestHistoryList !== this.props.route.params.requestHistoryList) {
    //         this.setState(previousState => ({ 
    //             requestList: this.props.route.params.requestHistoryList? this.props.route.params.requestHistoryList : [],
    //         }));
    //     }
    // }

    callApiGetRequestHistoryList(){
        fetch(getApiUrl()+'/users/nurses/'+this.state.nurseId+'/list/request-completed', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+this.props.token,
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                result.message ? null: 
                this.setState(previousState => ({
                    requestList: result,
                    dataChanged: !this.state.dataChanged,
                }));
            },            
            (error) => {
                console.log(error)
            }
        )
    }

    
    callApiTestList = async () => {
        fetch(getApiUrl()+"/test-types/type-test")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState(previousState => ({
                testsList: result,
            }));
            },            
            (error) => {
                console.log(error)
            }
        )  
    }


    sortByCreateTime(){
        const _requestList = this.state.requestList;
        _requestList.sort((a, b) => a.requestCreatedTime.localeCompare(b.requestCreatedTime))
        return _requestList;
    }

    sortByCompletedTime(){
        const _requestList = this.state.requestList;
        _requestList.sort((a, b) => a.requestMeetingTime.localeCompare(b.requestMeetingTime))
        return _requestList;
    }


    render(){
        debugger;
        const a = this.props.token;
        const b = this.state.nurseId;
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen="HomeScreen"></ScreenTopMenuBack>
                    <View 
                        style ={styles.background}>            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:30,color:'#25345D'}}>Lịch sử nhận đơn</Text>
                        </View>
                        <View style = {{flex:1}}>                            
                            <FlatList style={{                    
                                flex:1,
                                marginTop:10
                                }}
                                showsVerticalScrollIndicator={false}
                                //data={this.state.Button1Pressed? this.sortByCreateTime(): this.sortByCompletedTime()}
                                data={this.state.requestList}
                                extraData={this.state.dataChanged} 
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => {
                                        return (
                                            <View>                                
                                            <RequestListPendingItem
                                                requestId={item.requestID}
                                                request_createTime={item.requestCreatedTime}
                                                request_updateTime = {item.requestUpdatedTime}
                                                cust_name={item.customerName}
                                                cust_phone={item.customerPhoneNumber}
                                                cust_DOB={item.customerDOB}
                                                appoint_address={item.requestAddress}
                                                town_name = {item.requestTownName}
                                                district_name = {item.requestDistrictName}
                                                appoint_date={item.requestMeetingTime}
                                                nurse_name={item.nurseName}
                                                nurse_id={item.nurseID}
                                                selectedTest={item.lsSelectedTest}
                                                req_amount={item.requestAmount}
                                                req_status={item.requestStatus}
                                                testList={this.state.testsList}
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
const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        nurseInfor: state.loadNurse.nurseInfor,
        isLoadSuccess: state.loadNurse.isLoadSuccess,
        loadError: state.loadNurse.LoadError,
        token: state.login.token
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (nurseInfor) => dispatch(loadNurseInfor(nurseInfor)),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(RequestListHistoryScreen);





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
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import RequestListPendingItem from './RequestListPendingItem';
import requestsList from './../../Data/RequestsList'
import testList from './../../Data/Test'


export default class RequestListProcessingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRightButtonSelected: false,
            Button1Pressed:true,
            Button2Pressed:false,
            Button3Pressed:false,
            dataChanged: true,
            requestList: this.props.route.params.requestProcessingList? this.props.route.params.requestProcessingList : [],
            requestViewList: this.props.route.params.requestProcessingList? this.props.route.params.requestProcessingList : [],
        };
        this.getAcceptedList = this.getAcceptedList.bind(this);
        this.getTransportingList = this.getTransportingList.bind(this);
        this.getLostSampleList = this.getLostSampleList.bind(this);
    }
    
    componentDidMount(){
        this.getAcceptedList();
    }

    componentDidUpdate  (prevProps, prevState) {
         if (prevProps.route.params.requestProcessingList !== this.props.route.params.requestProcessingList) {
            this.setState(previousState => ({ 
                requestList: this.props.route.params.requestProcessingList? this.props.route.params.requestProcessingList : [],
            }));
        }
    }


    getAcceptedList(){
        let _requestList = this.state.requestList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].req_status === 'accepted' || _requestList[index].req_status === 'lostsample') {
                result.push(_requestList[index]);
                }
            index -= 1;
        }        
        return result;
    }

    getTransportingList(){
        let _requestList = this.state.requestList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].req_status === 'transporting') {
                result.push(_requestList[index]);
                }
            index -= 1;
        }
        return result;
    }

    getLostSampleList(){
        let _requestList = this.state.requestList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].req_status === 'lostsample') {
                result.push(_requestList[index]);
                }
            index -= 1;
        }
        return result;
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




    render(){
        
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen="HomeScreen"></ScreenTopMenuBack>
                    <View 
                        style ={styles.background}>            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Đơn đang nhận</Text>
                        </View>
                        <View style = {{flex:1}}>
                            <View style={[styles.titleArea,{
                                height:60,
                                marginBottom:10,
                                paddingLeft:10,
                                paddingRight:10,
                                }]}>     
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState(previousState => ({ 
                                            Button1Pressed: true,
                                            Button2Pressed: false,
                                            Button3Pressed: false,
                                            dataChanged: !this.state.dataChanged,
                                            }))
                                    }}
                                    style ={[styles.mainButton,{
                                        backgroundColor:this.state.Button1Pressed?'#6fc02d':'#b1de8c',
                                        borderWidth:this.state.Button1Pressed? 3:0,
                                        borderBottomLeftRadius:10,
                                        borderTopLeftRadius:10
                                    }]}                                
                                    >
                                    <Text style={{fontSize:17}}>Chưa lấy mẫu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState(previousState => ({ 
                                            Button1Pressed: false,
                                            Button2Pressed: true,
                                            Button3Pressed: false,
                                            dataChanged: !this.state.dataChanged,
                                            }))
                                    }}
                                    style ={[styles.mainButton,{
                                        backgroundColor:this.state.Button2Pressed?'#fba739':'#fccd90',
                                        borderWidth:this.state.Button2Pressed? 3:0,   
                                        borderBottomRightRadius:10,
                                        borderTopRightRadius:10                          
                                    }]}                                
                                    >
                                    <Text style={{fontSize:17}}>Đã lấy mẫu</Text>
                                </TouchableOpacity>  
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        this.setState(previousState => ({ 
                                            Button1Pressed: false,
                                            Button2Pressed: false,
                                            Button3Pressed: true,
                                            dataChanged: !this.state.dataChanged,
                                            }))
                                    }}
                                    style ={[styles.mainButton,{
                                        flex:10,
                                        backgroundColor:this.state.Button3Pressed?'#ed3746':'#ffbbb1',
                                        borderWidth:this.state.Button3Pressed? 3:0,
                                        borderBottomRightRadius:10,
                                        borderTopRightRadius:10                           
                                    }]}                                
                                    >
                                    <Text style={{fontSize:20}}>!</Text>
                                </TouchableOpacity>                     */}
                            </View>
                            <FlatList style={{                    
                                flex:1
                                }}
                                showsVerticalScrollIndicator={false}
                                data={this.state.Button1Pressed ? this.getAcceptedList() : this.state.Button2Pressed ? this.getTransportingList() : this.getLostSampleList()}
                                extraData={this.state.dataChanged} 
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
        flex:50,
        height:33,        
        justifyContent:'center',
        alignItems:'center',  
        borderColor:'black'
    },    
});
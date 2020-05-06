import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import RequestListPendingItem from './RequestListPendingItem';
import requestsList from './../../Data/RequestsList'
import testList from './../../Data/Test'
import { getApiUrl } from './../Common/CommonFunction'


class RequestListProcessingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nurseId: this.props.nurseInfor ? this.props.nurseInfor.id : '-1',
            isRightButtonSelected: false,
            Button1Pressed: true,
            Button2Pressed: false,
            Button3Pressed: false,
            dataChanged: true,
            testsList: [],
            requestList: [],
        };
        this.getAcceptedList = this.getAcceptedList.bind(this);
        this.getTransportingList = this.getTransportingList.bind(this);
        this.getLostSampleList = this.getLostSampleList.bind(this);
    }

    componentDidMount() {
        this.callApiGetRequestProcessingList();
        this.callApiTestList();
        this.props.navigation.addListener("focus", () => {
            this.callApiGetRequestProcessingList();
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.nurseInfor !== this.props.nurseInfor) {
            this.setState({
                nurseId: this.props.nurseInfor ? this.props.nurseInfor.id : '-1',
                requestList: [],
            });
            this.callApiGetRequestProcessingList();
        }
    }

    callApiGetRequestProcessingList() {
        fetch(getApiUrl() + '/users/nurses/' + this.state.nurseId + '/list/handling', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    if (result.success == false) {
                        if (result.message == 'Hệ thống đang xử lý. Vui lòng tải lại!') {
                            Alert.alert(
                                'Hệ thống: ',
                                'Hệ thống đang xử lý. Vui lòng tải lại',
                                [
                                    {
                                        text: 'Hủy',
                                        onPress: () => {
                                            return null;
                                        },
                                    },
                                    {
                                        text: 'Tải lại',
                                        onPress: () => {
                                            setTimeout(() => {
                                                this.callApiGetRequestHistoryList();
                                            }, 5000);
                                        },
                                    },
                                ],
                            );
                        } else {
                            this.setState({
                                requestList: [],
                            });
                        }
                    } else {
                        this.setState(previousState => ({
                            requestList: result,
                            dataChanged: !this.state.dataChanged,
                        }));
                    }         
                },
                (error) => {
                    console.log(error)
                }
            )
    }


    callApiTestList = async () => {
        fetch(getApiUrl() + "/test-types/type-test")
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


    getAcceptedList() {
        let _requestList = this.state.requestList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].requestStatus === 'accepted' || _requestList[index].requestStatus === 'lostsample' 
             || _requestList[index].requestStatus === 'relostsample'  || _requestList[index].requestStatus === 'reaccepted') {
                result.push(_requestList[index]);
            }
            index -= 1;
        }
        return result;
    }

    getTransportingList() {
        let _requestList = this.state.requestList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].requestStatus === 'transporting' || _requestList[index].requestStatus === 'retransporting') {
                result.push(_requestList[index]);
            }
            index -= 1;
        }
        return result;
    }

    getLostSampleList() {
        let _requestList = this.state.requestList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].req_status === 'lostsample' || _requestList[index].req_status === 'relostsample') {
                result.push(_requestList[index]);
            }
            index -= 1;
        }
        return result;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScreenTopMenuBack navigation={this.props.navigation} backScreen="HomeScreen"></ScreenTopMenuBack>
                <View
                    style={styles.background}>
                    <View style={styles.titleArea}>
                        <Text style={{ fontSize: 22, color: '#25345D' }}>Đơn đang nhận</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={[styles.titleArea, {
                            height: 60,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
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
                                style={[styles.mainButton, {
                                    backgroundColor: this.state.Button1Pressed ? '#6fc02d' : '#b1de8c',
                                    borderWidth: this.state.Button1Pressed ? 3 : 0,
                                    borderBottomLeftRadius: 10,
                                    borderTopLeftRadius: 10
                                }]}
                            >
                                <Text style={{ fontSize: 17 }}>Chưa lấy mẫu</Text>
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
                                style={[styles.mainButton, {
                                    backgroundColor: this.state.Button2Pressed ? '#fba739' : '#fccd90',
                                    borderWidth: this.state.Button2Pressed ? 3 : 0,
                                    borderBottomRightRadius: 10,
                                    borderTopRightRadius: 10
                                }]}
                            >
                                <Text style={{ fontSize: 17 }}>Đã lấy mẫu</Text>
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
                            flex: 1
                        }}
                            showsVerticalScrollIndicator={false}
                            data={this.state.Button1Pressed ? this.getAcceptedList() : this.state.Button2Pressed ? this.getTransportingList() : this.getLostSampleList()}
                            extraData={this.state.dataChanged}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <RequestListPendingItem
                                            requestId={item.requestID}
                                            request_createTime={item.requestCreatedTime}
                                            request_updateTime={item.requestUpdatedTime}
                                            cust_name={item.customerName}
                                            cust_phone={item.customerPhoneNumber}
                                            cust_DOB={item.customerDOB}
                                            appoint_address={item.requestAddress}
                                            town_name={item.requestTownName}
                                            district_name={item.requestDistrictName}
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

export default connect(mapStateToProps, mapStateToDispatch)(RequestListProcessingScreen);





const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleArea: {
        height: 50,
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        marginTop: 15,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 3,
        borderRadius: 10
    },
    mainButton: {
        flex: 50,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black'
    },
});
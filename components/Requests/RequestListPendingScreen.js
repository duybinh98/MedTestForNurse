import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import RequestListPendingItem from './RequestListPendingItem';
import requestsList from './../../Data/RequestsList';
import testList from './../../Data/Test';
import { getApiUrl } from './../Common/CommonFunction';
import { loadNurseInfor } from '../Store/Reducers/LoadInforReducer'



class RequestListPendingScreen extends Component {
        constructor(props) {
            super(props)
            this.state = {
                isRightButtonSelected: false,
                Button1Selected: true,
                Button2Selected: false,
                dataChanged: true,
                testsList: [],
                // requestList: this.props.route.params.requestPendingList? this.props.route.params.requestPendingList : [],
                requestList: [],
            };
            this.sortByCreateTime = this.sortByCreateTime.bind(this);
            this.sortByAppointmentTime = this.sortByAppointmentTime.bind(this);
        }

        componentDidMount() {
            this.callApiGetRequestPendingList();
            this.callApiTestList();
            this.props.navigation.addListener("focus", () => {
                this.callApiGetRequestPendingList();
            })
        }

        // componentDidUpdate  (prevProps, prevState) {
        //      if (prevProps.route.params !== this.props.route.params) {
        //         this.setState(previousState => ({ 
        //             dataChanged: !this.state.dataChanged,
        //         }));
        //     }
        // }




        callApiGetRequestPendingList() {
            fetch(getApiUrl() + "/users/nurses/find-request", {
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

        sortByCreateTime() {
            const _requestList = this.state.requestList;
            if (_requestList != null) _requestList.sort((a, b) => a.requestCreatedTime.localeCompare(b.requestCreatedTime))
            return _requestList;
        }

        sortByAppointmentTime() {
            const _requestList = this.state.requestList;
            if (_requestList != null) _requestList.sort((a, b) => a.requestMeetingTime.localeCompare(b.requestMeetingTime))
            // if (_requestList != null) _requestList.sort((a, b) => b.requestMeetingTime.localeCompare(a.requestMeetingTime))
            return _requestList;
        }


        render() {

            return (
                <View style={{ flex: 1 }}>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen="HomeScreen"></ScreenTopMenuBack>
                    <View
                        style={styles.background}>
                        <View style={styles.titleArea}>
                            <Text style={{ fontSize: 22, color: '#25345D' }}>Tìm đơn xét nghiệm</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.titleArea, {
                                height: 60,
                                marginBottom: 10
                            }]}>
                                <TouchableOpacity
                                    onPress={() => this.setState(previousState => ({
                                        Button1Selected: true,
                                        Button2Selected: false,
                                        dataChanged: !this.state.dataChanged,
                                    }))}
                                    style={[styles.mainButton, {
                                        backgroundColor: this.state.Button1Selected ? '#6fc02d' : '#b1de8c',
                                        borderWidth: this.state.Button1Selected ? 3 : 0,
                                        borderBottomLeftRadius: 10,
                                        borderTopLeftRadius: 10
                                    }]}
                                >
                                    <Text style={{ fontSize: 18 }}>Đơn vừa tạo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState(previousState => ({
                                        Button1Selected: false,
                                        Button2Selected: true,
                                        dataChanged: !this.state.dataChanged,
                                    }))}
                                    style={[styles.mainButton, {
                                        backgroundColor: this.state.Button2Selected ? '#fba739' : '#fccd90',
                                        borderWidth: this.state.Button2Selected ? 3 : 0,
                                        borderBottomRightRadius: 10,
                                        borderTopRightRadius: 10
                                    }]}
                                >
                                    <Text style={{ fontSize: 18 }}>Lấy mẫu sớm nhất</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList style={{
                                flex: 1
                            }}
                                showsVerticalScrollIndicator={false}
                                data={this.state.Button1Selected ? this.sortByCreateTime() : this.sortByAppointmentTime()}
                                extraData={this.state.dataChanged}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <RequestListPendingItem
                                                requestId={item.requestID}
                                                request_createTime={item.requestCreatedTime}
                                                cust_name={item.customerName}
                                                cust_phone={item.customerPhoneNumber}
                                                cust_DOB={item.customerDOB}
                                                appoint_address={item.requestAddress}
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

export default connect(mapStateToProps, mapStateToDispatch)(RequestListPendingScreen);





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
        width: 157,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black'
    },
});
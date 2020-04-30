import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import TestCategoryItem from './TestCategoryItem'
import TestViewItem from './TestViewItem'
import testList from './../../Data/Test'
import { getApiUrl, convertDateTimeToDate, convertDateTimeToTime, getStateName, getStateColor, convertMoney } from './../Common/CommonFunction'

class RequestViewScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestId: this.props.route.params.requestId ? this.props.route.params.requestId : '-1',
            name: this.props.route.params.name ? this.props.route.params.name : 'Nguyễn Văn A',
            dob: this.props.route.params.dob ? this.props.route.params.dob : '01/01/1970',
            phone: this.props.route.params.phone ? this.props.route.params.phone : '0123456789',
            address: this.props.route.params.address ? this.props.route.params.address : 'Số 123 đường abc, xyz',
            townName: this.props.route.params.townName ? this.props.route.params.townName : '',
            districtName: this.props.route.params.districtName ? this.props.route.params.districtName : '',
            date: this.props.route.params.date ? this.props.route.params.date : '20/20/2020',
            status: this.props.route.params.status ? this.props.route.params.status : 'Đang đợi lấy mẫu',
            statusName: this.props.route.params.status ? getStateName(this.props.route.params.status) : 'Đang đợi lấy mẫu',
            statusColor: this.props.route.params.status ? getStateColor(this.props.route.params.status) : '#7ab648',
            // nurseName: 'Nguyễn Văn B',
            nurseName: this.props.nurseInfor ? this.props.nurseInfor.name : '',
            createdTime: this.props.route.params.createdTime
                ? this.props.route.params.createdTime
                : '',
            updatedTime: this.props.route.params.updatedTime
                ? this.props.route.params.updatedTime
                : '',
            totalAmount: this.props.route.params.totalAmount ? this.props.route.params.totalAmount : 'free',
            leftButtonText: this.props.route.params.status ? this.getLeftButtonName(this.props.route.params.status) : '',
            rightButtonText: this.props.route.params.status ? this.getRightButtonName(this.props.route.params.status) : 'Quay lại',
            disabledLeftButton: false,
            disabledRightButton: false,
        };
        this.isSelected = this.isSelected.bind(this);
        this.onAcceptRequest = this.onAcceptRequest.bind(this);
        this.onReleaseRequest = this.onReleaseRequest.bind(this);
        this.onTakingSample = this.onTakingSample.bind(this);
        this.onLostSample = this.onLostSample.bind(this);
        this.onLeftButtonPress = this.onLeftButtonPress.bind(this);
        this.onRightButtonPress = this.onRightButtonPress.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.route.params !== this.props.route.params) {
            this.setState(previousState => ({
                requestId: this.props.route.params.requestId ? this.props.route.params.requestId : '-1',
                name: this.props.route.params.name ? this.props.route.params.name : 'Nguyễn Văn A',
                dob: this.props.route.params.dob ? this.props.route.params.dob : '01/01/1970',
                phone: this.props.route.params.phone ? this.props.route.params.phone : '0123456789',
                address: this.props.route.params.address ? this.props.route.params.address : 'Số 123 đường abc, xyz',
                townName: this.props.route.params.townName ? this.props.route.params.townName : '',
                districtName: this.props.route.params.districtName ? this.props.route.params.districtName : '',
                date: this.props.route.params.date ? this.props.route.params.date : '20/20/2020',
                status: this.props.route.params.status ? this.props.route.params.status : 'Đang đợi lấy mẫu',
                statusName: this.props.route.params.status ? getStateName(this.props.route.params.status) : 'Đang đợi lấy mẫu',
                statusColor: this.props.route.params.status ? getStateColor(this.props.route.params.status) : '#7ab648',
                // nurseName: 'Nguyễn Văn B',
                nurseName: this.props.nurseInfor ? this.props.nurseInfor.name : '',
                createdTime: this.props.route.params.createdTime
                    ? this.props.route.params.createdTime
                    : '',
                updatedTime: this.props.route.params.updatedTime
                    ? this.props.route.params.updatedTime
                    : '',
                totalAmount: this.props.route.params.totalAmount ? this.props.route.params.totalAmount : 'free',
                leftButtonText: this.props.route.params.status ? this.getLeftButtonName(this.props.route.params.status) : '',
                rightButtonText: this.props.route.params.status ? this.getRightButtonName(this.props.route.params.status) : 'Quay lại',
            }));
        }
    }



    componentDidMount() {

    }

    callApiUpdateRequest(_status, _note, _screenName) {
        this.setState({
            disabledLeftButton: true,
            disabledRightButton: true,
        })
        fetch(getApiUrl() + "/requests/update/" + this.state.requestId, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            },
            body: JSON.stringify({
                status: _status,
                userID: this.props.nurseInfor.id,
                note: _note,
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        disabledLeftButton: false,
                        disabledRightButton: false,
                    })
                    console.log(result)
                    if (result.success == false) {
                        Alert.alert(
                            'Thông báo',
                            result.message,
                            [
                                {
                                    text: 'Xác nhận',
                                    onPress: () => {
                                        this.props.navigation.navigate('RequestListProcessingScreen');
                                    },
                                },
                            ],
                        );
                    } else {
                        this.props.navigation.dispatch(
                            CommonActions.navigate({
                                name: _screenName,
                                params: {
                                },
                            }))
                    }
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    onAcceptRequest() {
        Alert.alert(
            'Thông báo xác nhận',
            'Bạn có muốn nhận đơn không?',
            [
                { text: 'Hủy', onPress: () => { return null } },
                {
                    text: 'Xác nhận', onPress: () => {
                        this.callApiUpdateRequest('accepted', 'I want to accept this request', 'RequestListProcessingScreen')
                    }
                },
            ]
        )
    }

    onReAcceptRequest() {
        Alert.alert(
            'Thông báo xác nhận',
            'Bạn có muốn nhận đơn không?',
            [
                { text: 'Hủy', onPress: () => { return null } },
                {
                    text: 'Xác nhận', onPress: () => {
                        this.callApiUpdateRequest('reaccepted', 'I want to accept this request', 'RequestListProcessingScreen')
                    }
                },
            ]
        )
    }

    onReleaseRequest() {
        Alert.alert(
            'Thông báo xác nhận',
            'Bạn có muốn hủy đơn không?',
            [
                { text: 'Hủy', onPress: () => { return null } },
                {
                    text: 'Xác nhận', onPress: () => {
                        this.callApiUpdateRequest('pending', 'I want to release this request', 'RequestListPendingScreen')
                    }
                },
            ]
        )
    }

    onReReleaseRequest() {
        Alert.alert(
            'Thông báo xác nhận',
            'Bạn có muốn hủy đơn không?',
            [
                { text: 'Hủy', onPress: () => { return null } },
                {
                    text: 'Xác nhận', onPress: () => {
                        this.callApiUpdateRequest('coordinatorlostsample', 'I want to release this request', 'RequestListPendingScreen')
                    }
                },
            ]
        )
    }

    onTakingSample() {
        Alert.alert(
            'Thông báo xác nhận',
            'Bạn đã lấy được mẫu?',
            [
                { text: 'Hủy', onPress: () => { return null } },
                {
                    text: 'Xác nhận', onPress: () => {
                        this.callApiUpdateRequest('transporting', 'I have taken sample and transport it to coordinator', 'RequestListProcessingScreen')
                    }
                },
            ]
        )
    }

    onReTakingSample() {
        Alert.alert(
            'Thông báo xác nhận',
            'Bạn đã lấy được mẫu?',
            [
                { text: 'Hủy', onPress: () => { return null } },
                {
                    text: 'Xác nhận', onPress: () => {
                        this.callApiUpdateRequest('retransporting', 'I have taken sample and transport it to coordinator', 'RequestListProcessingScreen')
                    }
                },
            ]
        )

    }

    onLostSample() {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'CancelRequestScreen',
                params: {
                    title: 'Báo mất mẫu',
                    status: 'lostsample',
                    requestId: this.state.requestId,
                    name: this.state.name,
                    date: this.state.date,
                    nurseId: this.props.nurseInfor.id,
                    backScreen: 'RequestListProcessingScreen',
                    token: this.props.token,
                },
            }))
    }

    onReLostSample() {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'CancelRequestScreen',
                params: {
                    title: 'Báo mất mẫu',
                    status: 'relostsample',
                    requestId: this.state.requestId,
                    name: this.state.name,
                    date: this.state.date,
                    nurseId: this.props.nurseInfor.id,
                    backScreen: 'RequestListProcessingScreen',
                    token: this.props.token,
                },
            }))
    }


    getLeftButtonName(status) {
        switch (status) {
            case 'pending':
                return 'Nhận đơn';
                break;
            case 'accepted':
                return 'Hủy đơn';
                break;
            case 'transporting':
                return 'Báo mất mẫu';
                break;
            case 'lostsample':
                return '';
                break;
            case 'waitingforresult':
                return '';
                break;
            case 'coordinatorlostsample':
                return 'Nhận đơn';
                break;
            case 'reaccepted':
                return 'Hủy đơn';
                break;
            case 'retransporting':
                return 'Báo mất mẫu';
                break;
            case 'relostsample':
                return '';
                break;
            case 'closed':
                return '';
                break;
            case 'canceled':
                return '';
                break;
        }
    }

    getRightButtonName(status) {
        switch (status) {
            case 'pending':
                return 'Quay lại';
                break;
            case 'accepted':
                return 'Xác nhận lấy mẫu';
                break;
            case 'transporting':
                return 'Quay lại';
                break;
            case 'lostsample':
                return 'Xác nhận lấy mẫu';
                break;
            case 'waitingforresult':
                return 'Quay lại';
                break;
            case 'coordinatorlostsample':
                return 'Quay lại';
                break;
            case 'reaccepted':
                return 'Xác nhận lấy mẫu';
                break;
            case 'retransporting':
                return 'Quay lại';
                break;
            case 'relostsample':
                return 'Xác nhận lấy mẫu';
                break;
            case 'closed':
                return 'Quay lại';
                break;
            case 'canceled':
                return 'Quay lại';
                break;
        }
    }


    onLeftButtonPress() {
        switch (this.state.status) {
            case 'pending':
                this.onAcceptRequest();
                break;
            case 'accepted':
                this.onReleaseRequest();
                break;
            case 'transporting':
                this.onLostSample();
                break;
            case 'lostsample':
                this.props.navigation.goBack();
                break;
            case 'waitingforresult':
                this.props.navigation.goBack();
                break;
            case 'coordinatorlostsample':
                this.onReAcceptRequest();
                break;
            case 'reaccepted':
                this.onReReleaseRequest();
                break;
            case 'retransporting':
                this.onReLostSample();
                break;
            case 'relostsample':
                this.props.navigation.goBack();
                break;
            case 'closed':
                this.props.navigation.goBack();
                break;
            case 'canceled':
                this.props.navigation.goBack();
                break;

        }
    }

    onRightButtonPress() {
        switch (this.state.status) {
            case 'pending':
                this.props.navigation.goBack();
                break;
            case 'accepted':
                this.onTakingSample();
                break;
            case 'transporting':
                this.props.navigation.goBack();
                break;
            case 'lostsample':
                this.onTakingSample();
                break;
            case 'waitingforresult':
                this.props.navigation.goBack();
                break;
            case 'coordinatorlostsample':
                this.props.navigation.goBack();
                break;
            case 'reaccepted':
                this.onReTakingSample();
                break;
            case 'retransporting':
                this.props.navigation.goBack();
                break;
            case 'relostsample':
                this.onReTakingSample();
                break;
            case 'closed':
                this.props.navigation.goBack();
                break;
            case 'canceled':
                this.props.navigation.goBack();
                break;

        }
    }

    isSelected(id) {
        const found = this.props.route.params.selectedTest.findIndex(test => test == id);
        let result = false;
        found === -1 ? '' : result = true;
        return result;
    }

    render() {
        debugger;
        const a = this.props.nurseInfor;
        const b = this.state.address
        return (
            <View style={{ flex: 1 }}>
                <ScreenTopMenuBack navigation={this.props.navigation} backScreen={this.props.backScreen ? this.props.backScreen : null}></ScreenTopMenuBack>
                <ScrollView
                    style={styles.background}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <View style={styles.titleArea}>
                        <Text style={{ fontSize: 22, color: '#25345D' }}>Đơn xét nghiệm</Text>
                    </View>
                    <View style={styles.infoArea}>
                        <View style={styles.textContainerId}>
                            <Text style={[styles.textInfor]} >Mã đơn xét nghiệm: </Text>
                            <Text style={[styles.textInforId]} > {this.state.requestId}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textInfor} >Tên khách hàng:  {this.state.name}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textInfor} >Số điện thoại: {this.state.phone}</Text>
                        </View>
                        {/* <View style={styles.textContainer}>
                            <Text style={styles.textInfor} >Ngày sinh: {convertDateTimeToDate(this.state.dob)}</Text>
                        </View> */}
                        <View style={styles.textContainer}>
                            <Text style={styles.textInfor} >Địa chỉ: {this.state.address + ', ' + this.state.townName + ', ' + this.state.districtName}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textInfor}>
                                Ngày tạo đơn: {this.state.createdTime}
                            </Text>
                        </View>
                        <View style={styles.doubleContainer}>
                            <View style={{
                                width: 180
                            }}>
                                <Text style={styles.textInfor} >Ngày hẹn: {convertDateTimeToDate(this.state.date)}</Text>
                            </View>
                            <View style={{
                                width: 120
                            }}>
                                <Text style={styles.textInfor} >Giờ hẹn: {convertDateTimeToTime(this.state.date)}</Text>
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textInfor} >Tổng số tiền: {convertMoney(this.state.totalAmount)} đ</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textInfor}>
                                Cập nhật mới nhất: {convertDateTimeToDate(this.state.updatedTime) + ' ' + convertDateTimeToTime(this.state.updatedTime)}
                            </Text>
                        </View>
                        <View style={styles.doubleContainer}>
                            <View style={{
                                width: 82
                            }}>
                                <Text style={styles.textInfor} >Trạng thái:</Text>
                            </View>
                            <View style={{
                                width: 180
                            }}>
                                <Text style={[styles.textInfor, { backgroundColor: this.state.statusColor, textAlign: 'center' }]} >
                                    {this.state.statusName}
                                </Text>
                            </View>
                        </View>
                        {this.state.status !== 'pending' ? this.state.status !== 'coordinatorlostsample' ?
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Y tá: {this.state.nurseName}</Text>
                            </View>
                            : null : null
                        }
                    </View>
                    <View style={styles.TestListAreaBackground}>
                        <View
                            style={styles.TestListArea}
                        >
                            <FlatList
                                style={styles.TestListAreaScrollView}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                                data={this.props.route.params.testsList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <TestCategoryItem
                                            categoryName={item.testTypeName}
                                            test={item.listTest}
                                            viewOnly={true}
                                            isSelected={this.isSelected}
                                        >
                                        </TestCategoryItem>
                                    );
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {this.state.leftButtonText ?
                            <TouchableOpacity style={styles.btnConfirm} disabled={this.state.disabledLeftButton} onPress={() => this.onLeftButtonPress()}>
                                <Text style={styles.textBtn}> {this.state.leftButtonText}</Text>
                            </TouchableOpacity>
                            : <View />
                        }
                        <TouchableOpacity style={styles.btnConfirm} disabled={this.state.disabledRightButton} onPress={() => this.onRightButtonPress()}>
                            <Text style={styles.textBtn}> {this.state.rightButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        loadError: state.loadNurse.LoadError
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (nurseInfor) => dispatch(loadNurseInfor(nurseInfor)),
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(RequestViewScreen);




const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',

    },
    titleArea: {
        height: 50,
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 3,
        borderRadius: 10
    },
    infoArea: {
        alignSelf: 'stretch',
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
        paddingTop: 3,
        paddingBottom: 5,
    },
    textContainer: {
        marginTop: 5,
        width: Dimensions.get('window').width - 55,
        alignSelf: 'stretch',
        marginBottom: 5,
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    textContainerId: {
        marginTop: 5,
        width: Dimensions.get('window').width - 55,
        alignSelf: 'stretch',
        marginHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInfor: {

        fontSize: 16,
    },
    textInforId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0A6ADA'
    },
    doubleContainer: {
        marginTop: 5,
        marginBottom: 5,
        width: Dimensions.get('window').width - 55,
        alignSelf: 'stretch',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchArea: {
        height: 40,
        width: Dimensions.get('window').width - 40,
        backgroundColor: 'white',
        marginTop: 5,

        paddingLeft: 10,
        paddingRight: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#25345D',
        color: '#25345D'
    },
    TestListAreaBackground: {
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,

    },
    TestListArea: {
        width: Dimensions.get('window').width - 20,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    TestListAreaScrollView: {
        width: Dimensions.get('window').width - 40,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 20,
        height: 54,
        marginBottom: 10
    },
    btnConfirm: {
        width: 140,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        paddingBottom: 3,
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },

});
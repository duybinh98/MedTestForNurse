import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenuBack from '../Common/ScreenTopMenuBack';
import { getApiUrl, convertDateTimeToDate } from '../Common/CommonFunction';
import { connect } from 'react-redux';
import { login } from '../Reducers/LoginReducer';
// import { getApiUrl } from './../Common/CommonFunction';
import { loadNurseInfor } from '../Reducers/LoadInforReducer';


const { width: WIDTH } = Dimensions.get('window')
class nurseInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nurseInfor: null,
            nurseId: this.props.nurseInfor ? this.props.nurseInfor.id : '-1',
            token: this.props.token ? this.props.token : null,
            townName: this.props.nurseInfor ? this.props.nurseInfor.townName : "Chọn phường/xã",
            districtName: this.props.nurseInfor ? this.props.nurseInfor.districtName : 'Chọn quận huyện',
            districtList: [],
            townList: [],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.nurseInfor !== this.props.nurseInfor) {
            this.setState(previousState => ({
                token: this.props.token,
                nurseInfor: this.props.nurseInfor ? this.props.nurseInfor : this.state.nurseInfor,
                nurseId: this.props.nurseInfor ? this.props.nurseInfor.id : '-1',
                townName: this.props.nurseInfor ? this.props.nurseInfor.townName : "Chọn phường/xã",
                districtName: this.props.nurseInfor ? this.props.nurseInfor.districtName : 'Chọn quận huyện',
            }));
        }
    }
    componentDidMount() {
        this.callApinurseInfor();
        this.props.navigation.addListener('focus', () => {
            this.callApinurseInfor();
        });
    }
    callApiGetDistrictCode() {
        fetch(getApiUrl() + "/management/districts/district-town-list")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(previousState => ({
                        districtList: result,
                    }));
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    callApiGetTownCode() {
        fetch(getApiUrl() + "/management/districts/towns/list")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(previousState => ({
                        townList: result,
                    }));
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    callApinurseInfor() {
        fetch(getApiUrl() + '/users/nurses/detail/' + this.state.nurseId, {
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
                    if (result.message) {
                        alert(result.message);
                    } else {
                        console.log(result)
                        this.setState(previousState => ({
                            nurseInfor: result,
                        }));
                    }
                },
                (error) => {
                    console.log(error)
                }
            )

    }
    render() {
        const { gender } = this.state;
        return (
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <ScreenTopMenuBack navigation={this.props.navigation} backScreen='HomeScreen'></ScreenTopMenuBack>
                <View>
                    <View style={styles.logoContainer}>
                        <ImageBackground
                            source={{ uri: this.state.nurseInfor ? this.props.nurseInfor.image : '' }}
                            style={styles.logo} >
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.infoArea}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textInfor} >Tên hiển thị:  {this.state.nurseInfor ? this.state.nurseInfor.name : ""}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textInfor} >Số điện thoại: {this.state.nurseInfor ? this.state.nurseInfor.phoneNumber : ""}</Text>
                    </View>
                    <View style={styles.dobGenderContainer}>
                        <View style={styles.dobContainer}>
                            <Text style={styles.textInfor} >Ngày sinh: {this.state.nurseInfor ? convertDateTimeToDate(this.state.nurseInfor.dob) : ""}</Text>
                        </View>
                        <View style={styles.genderContainer}>
                            <Text style={styles.textInfor} >Giới tính: {this.state.nurseInfor ? this.state.nurseInfor.gender === 0 ? "Nữ" : "Nam" : ''}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textInfor} >
                            Địa chỉ:  {
                                this.state.nurseInfor ?
                                    this.state.nurseInfor.address + ', ' + this.state.townName + ', ' + this.state.districtName
                                    : ""}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textInfor} >Email: {this.state.nurseInfor ? this.state.nurseInfor.email : ''}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btnConfirm}
                        onPress={() => this.props.navigation.navigate('ChangePassword')}
                    >
                        <Text style={styles.textBtn}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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

export default connect(mapStateToProps, mapStateToDispatch)(nurseInformation);

//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    logoContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 20
    },
    logoText: {
        fontSize: 30,
        color: '#25345D',
    },
    infoArea: {
        height: 285,
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
        paddingTop: 3,
        paddingBottom: 10,
        marginHorizontal: 10
    },
    textContainer: {
        marginTop: 10,
        borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        marginHorizontal: 25,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    dobGenderContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        marginHorizontal: 17,
    },
    dobContainer: {
        flex: 70,
        borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    genderContainer: {
        flex: 45,
        borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        justifyContent: 'center',
        paddingLeft: 10,
        marginLeft: 10,
    },
    textInfor: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnConfirm: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 30,
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
    imageIcon: {
        position: 'relative',
        top: 92,
        left: 45,
    },
})
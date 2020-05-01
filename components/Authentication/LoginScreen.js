import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { login, logout} from '../Reducers/LoginReducer';
import {loadNurseInfor} from '../Reducers/LoadInforReducer';
import renderField, {required, isWeakPassword, isNumber, isPhonenumber} from '../../Validate/RenderField'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: '',
            nurseInfoFromLogin: null,
            disabledButton: false,
        };
        this.submit = this.submit.bind(this)
        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });
        this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                this.handleBackButton,
            );
        });
    }
    handleBackButton = () => {
        Alert.alert(
            'Cảnh báo!',
            'Bạn có muốn tắt ứng dụng?',
            [{
                text: 'Hủy',
                onPress: () => { return null },
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: () => {
                    this.props.logout();
                    BackHandler.exitApp();
                }
            },
            ], {
            cancelable: false,
        },
        );
        return true;
    };
    componentWillUnmount() {
        this._unsubscribeSiFocus();
        this._unsubscribeSiBlur();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    submit = value => {
        this.setState({
            disabledButton : true,
        })
        const { phoneNumber, password } = this.state;
        this.props.login(phoneNumber, password)
        let count = 0;
        var waitForIt = setInterval(() => {
            if (this.props.isLoginSuccess == true || count > 200) {
                clearInterval(waitForIt);
            }
            else console.log('wait')
            count += 1
        }, 100);
        setTimeout(() => {
            this.setState({
                disabledButton : false,
            })
            if (this.props.nurseInfoFromLogin != null ) {                
                this.props.load(this.props.nurseInfoFromLogin)
                this.props.navigation.dispatch(
                    CommonActions.navigate({
                        name: 'HomeScreen',
                        params: {
                        },
                    })
                )      
                this.props.reset();          
            }  
            else {
                console.log('error at screen'+this.props.LoginError)
                }
        },18000)


    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('./../../Image/LogoMedtest.png')}
                            style={styles.logo}
                        ></Image>
                        <View style={styles.titleArea} >
                            <Text style={styles.logoText}>Đăng nhập</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" isSecureText={false} maxLength = {10}
                        onChange={(text) => { this.setState({ phoneNumber: text }) }}
                        validate={[required, isNumber, isPhonenumber]}
                    />
                    <Field name="password" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Mật khẩu" isSecureText={true}
                        onChange={(text) => { this.setState({ password: text }) }}
                        validate={[required, isWeakPassword]}
                    />
                </View>
                <TouchableOpacity style={styles.btnLogin}  disabled={this.state.disabledButton}  onPress={handleSubmit(this.submit)}>
                    <Text style={styles.textBtn}>Đăng nhập</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoginPending: state.login.isLoginPending,
        isLoginSuccess: state.login.isLoginSuccess,
        LoginError: state.login.LoginError,
        nurseInfoFromLogin: state.login.nurseInfor,
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        // load: (nurseInfor) => dispatch(loadNurseInfor(nurseInfor)),
        load: (nurseInfor) => dispatch(loadNurseInfor(nurseInfor)),
        login: (phoneNumber, password) => dispatch(login(phoneNumber, password)),
        logout: () => dispatch(logout()),
    };
}
const LoginForm = reduxForm({
    form: 'login',
})(LoginComponent);
export default connect(mapStateToProps, mapStateToDispatch)(LoginForm);

const { width: WIDTH } = Dimensions.get('window')
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    backIcon: {
        position: "absolute",
        top: 10,
        left: 20,
    },
    nameHeader: {
        alignItems: "center",
        backgroundColor: '#25345D',
    },
    nameText: {
        margin: 10,
        fontSize: 25,
        color: 'white',
    },
    logo: {
        width: 120,
        height: 120,

    },
    logoContainer: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20
    },
    logoText: {
        fontSize: 30,
        color: '#25345D',
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 15,
        fontSize: 16,
        paddingLeft: 65,
        borderWidth: 2,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
        // color: 'rgba(255,255,255,0.7)',
        color: 'black',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 7,
        left: 35,
    },
    inputContainer: {
        marginTop: 10
    },
    btnLogin: {
        width: WIDTH - 170,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 85
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
    titleArea:{
        height: 50,
        width: Dimensions.get('window').width-25,
        backgroundColor: 'white',
        marginTop:15,
        marginBottom:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:3,
        borderRadius:10,
        marginHorizontal: 15
    },
})
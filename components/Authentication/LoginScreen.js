import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
// import action from '../Store/Action/actions';
import { login } from '../Store/Reducers/LoginReducer';
// import { getApiUrl } from './../Common/CommonFunction';
import { loadCustomerInfor } from '../Store/Reducers/LoadInforReducer';
import renderField from '../../Validate/RenderField'

//validate conditions
const required = value => value ? undefined : 'Required';
const isNumber = value => value && isNaN(Number(value)) ? 'Must be phone number' : undefined;
const isPhonenumber = value => value && value.length == 10 ? undefined : 'Must be 10 digits';
const isWeakPassword = value => value && value.length >= 6 ? undefined : 'Mật khẩu phải có 6 kí tự';


class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: '',

            customerInfoFromLogin: null,
        };
        this.submit = this.submit.bind(this)
    }

    submit = value => {
        const { phoneNumber, password } = this.state;
        this.props.login(phoneNumber, password)
        setTimeout(() => {
            if (this.props.customerInfoFromLogin != null ) {                
                this.setState(previousState => ({
                    phoneNumber: '',
                    password: '',
                }));
                this.props.load(this.props.customerInfoFromLogin)
                this.props.navigation.dispatch(
                    CommonActions.navigate({
                        name: 'HomeScreen',
                        params: {
                        },
                    })
                )                
            }  
            else {
                // console.log('error at screen'+this.props.LoginError)
                // Alert.alert(this.props.LoginError.message);
                }
        },2000)


    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                {/* <ScreenTopMenu {...this.props} ></ScreenTopMenu> */}
                <View>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: 'https://getdrawings.com/free-icon/react-icon-69.png' }}
                            style={styles.logo}
                        ></Image>
                        <View style={styles.titleArea} >
                            <Text style={styles.logoText}>Đăng nhập</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" isSecureText={false}
                        onChange={(text) => { this.setState({ phoneNumber: text }) }}
                        validate={[required, isNumber, isPhonenumber]}
                    />
                    <Field name="password" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Mật khẩu" isSecureText={true}
                        onChange={(text) => { this.setState({ password: text }) }}
                        validate={[required, isWeakPassword]}
                    />
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit(this.submit)}>
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
        customerInfoFromLogin: state.login.customerInfo,
    };
}
const mapStateToDispatch = (dispatch) => {
    return {
        load: (customerInfor) => dispatch(loadCustomerInfor(customerInfor)),
        login: (phoneNumber, password) => dispatch(login(phoneNumber, password))
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
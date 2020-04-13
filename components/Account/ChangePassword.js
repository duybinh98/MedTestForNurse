import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import {getApiUrl} from './../Common/CommonFunction';
import renderField from '../../Validate/RenderField';
import { load as loadAccount } from '../Store/Reducers/InitialValue';
import { loadNurseInfor } from '../Store/Reducers/LoadInforReducer';
import { connect } from 'react-redux';


//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isWeakPassword = value => value && value.length >= 6 ? undefined : 'Mật khẩu phải có ít nhất 6 kí tự';
const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';

const { width: WIDTH } = Dimensions.get('window')

class changePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nurseId: this.props.nurseInforLoad.id ? this.props.nurseInforLoad.id : '-1',
            name: this.props.nurseInforLoad ? this.props.nurseInforLoad.name : '',
            phonenumber: this.props.nurseInforLoad ? this.props.nurseInforLoad.phoneNumber : '',
            password: '',
            newPassword: '',
        };
        this.submit = this.submit.bind(this)
    }
    componentWillMount = value => {
        const nurseInfor = {
            username: this.state.name,
            phonenumber: this.state.phonenumber
        }
        this.props.load(nurseInfor)
    }
    submit = values => {
        if (values.password === values.newPassword) {
            alert("Mật khẩu mới phải khác mật khẩu cũ!")
        } else if (values.cfNewPassword !== values.newPassword) {
            alert("Xác nhận mật khẩu mới không đúng!")
        } else {
            fetch(getApiUrl()+'/users/nurses/change-password/'+this.state.nurseId, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
                },
                body: JSON.stringify({
                    oldPassword: this.state.password,
                    newPassword: this.state.newPassword,
                }),
                })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.success == "true") {
                        // alert(result.message)
                        Alert.alert(
                            'Đổi mật khẩu',
                            result.message,
                        )
                        this.props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'LoginScreen',
                                params: {

                                },
                            })
                        )
                    } else {
                        Alert.alert(
                            'Đổi mật khẩu',
                            result.message,
                        )
                    }
                },
                (error) => {
                    this.setState({
                        error
                    });
                    console.log(error)
                }
            );
        }
    }



    render() {
        debugger;
        const abc = this.props.customerInfo;
        const a = this.state.newPassword;
        const { handleSubmit } = this.props;
        return (
            <View style={styles.background}>
                <ScrollView>
                    <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                    <View>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>Đổi mật khẩu</Text>
                        </View>
                    </View>
                    <Field name="username" keyboardType="default" component={renderField} iconName="rename-box"
                        iconType="material-community" placeholder="Tên hiển thị" secureText={false}
                        onChange={(text) => { this.setState({ name: text }) }} editable={false}
                        validate={[required]}
                    />
                    <Field name="phonenumber" keyboardType="phone-pad" component={renderField} iconName="cellphone"
                        iconType="material-community" placeholder="Số điện thoại" secureText={false}
                        onChange={(text) => { this.setState({ phonenumber: text }) }} editable={false}
                        validate={[required, isNumber, isPhonenumber]}
                    />
                    <Field name="password" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Mật khẩu cũ" isSecureText={true}
                        onChange={(text) => { this.setState({ password: text }) }}
                        validate={[required, isWeakPassword]}
                    />
                    <Field name="newPassword" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Mật khẩu mới" isSecureText={true}
                        onChange={(text) => { this.setState({ newPassword: text }) }}
                        validate={[required, isWeakPassword]}
                    />
                    <Field name="cfNewPassword" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Xác nhận mật khẩu mới" isSecureText={true}
                        validate={[required, isWeakPassword]}
                    />
                    <TouchableOpacity style={styles.btnChangePassword} onPress={handleSubmit(this.submit)}>
                        <Text style={styles.textBtn}>Xác nhận đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

let ChangePasswordForm = reduxForm({
    form: 'changePassword',
    enableReinitialize: true,
})(changePassword);

ChangePasswordForm = connect(
    state => ({
        initialValues: state.initialValue.data,
        token: state.login.token,
        nurseInforLoad: state.loadNurse.nurseInfor,
        nurseInfor: state.login.nurseInfor
    }),
    {
        load: loadAccount,
    }
)(ChangePasswordForm);
export default ChangePasswordForm;
//#25345D
//#0A6ADA
//#27CDCB
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
    },
    logoContainer: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    logoText: {
        fontSize: 40,
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
        color: 'black',
    },
    inputIcon: {
        position: 'absolute',
        left: 7,
    },
    inputContainer: {
        width: WIDTH - 25,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white'
    },
    btnChangePassword: {
        width: WIDTH - 170,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#0A6ADA',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 85
    },
    textBtn: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },
})
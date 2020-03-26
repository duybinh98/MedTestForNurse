import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import { Field, reduxForm } from 'redux-form';
import { CommonActions } from '@react-navigation/native';
import {getApiUrl} from './../Common/CommonFunction';
import renderField from '../../Validate/RenderField';


//validate conditions
const required = values => values ? undefined : 'Bắt buộc';
const isWeakPassword = values => values && values.length == 6 ? undefined : 'Mật khẩu phải có 6 kí tự';

const { width: WIDTH } = Dimensions.get('window')

class changePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId:'4',
            password: '',
            newPassword: '',
        };
        this.submit = this.submit.bind(this)
    }
    submit = values => {
        if (values.password === values.newPassword) {
            alert("Mật khẩu mới phải khác mật khẩu cũ!")
        } else if (values.cfNewPassword !== values.newPassword) {
            alert("Xác nhận mật khẩu mới không đúng!")
        } else {
            fetch(getApiUrl()+'/users/customers/change-password/'+this.state.customerId, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: this.state.password,
                    newPassword: this.state.newPassword,

                }),
                })
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.navigation.dispatch(
                        CommonActions.navigate({
                            // name: 'LoginScreen',
                            // params: {
                            //     password: this.state.password,
                            //     newPassword: this.state.newPassword,
                            // },
                            name: 'HomeScreen',
                            params: {

                            },
                        })
                    )
                },
                (error) => {
                this.setState({                
                    error
                });
                console.log(error)
                }
            );

            // this.props.navigation.dispatch(
            //     CommonActions.navigate({
            //         name: 'LoginScreen',
            //         params: {
            //             password: this.state.password,
            //             newPassword: this.state.newPassword,
            //         },
            //     })
            // )
        }
    }



    render() {
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
                    <Field name="password" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Mật khẩu cũ" secureText={true}
                        onChange={(text) => { this.setState({ password: text }) }}
                        validate={[required, isWeakPassword]}
                    />
                    <Field name="newPassword" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Mật khẩu mới" secureText={true}
                        onChange={(text) => { this.setState({ newPassword: text }) }}
                        validate={[required, isWeakPassword]}
                    />
                    <Field name="cfNewPassword" keyboardType="default" component={renderField} iconName="lock-question"
                        iconType="material-community" placeholder="Xác nhận mật khẩu mới" secureText={true}
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

const ChangePasswordForm = reduxForm({
    form: 'changePassword',
})(changePassword);
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
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import { CommonActions } from '@react-navigation/native';
import { convertDateTimeToDate, convertDateTimeToTime, getStateName, getStateColor } from './../Common/CommonFunction'
// import renderField from '../../Validate/RenderField'
import { Field, reduxForm } from 'redux-form';

const required = values => values ? undefined : 'Thiếu lý do hủy xét nghiệm';

const renderField = ({
    iconName, iconType, keyboardType, meta: { touched, error, warning }, isSecureText,
    input: { onChange, ...restInput }, placeholder, isEditable, isMultiline, numberOfLines
}) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={isSecureText}
                    keyboardType={keyboardType} editable={isEditable} numberOfLines={4}
                    multiline={true}
                    onChangeText={onChange} {...restInput} autoCapitalize='none'
                ></TextInput>

            </View>
            {touched && ((error && <Text style={{ color: 'red', paddingLeft: 45, marginBottom: 5 }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
    );
}

class CancelRequestScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Nguyễn Văn A',
            date: '20/20/2020',
            time: '17h00',
            showFooter: true,
            buttonText: 'Hủy đơn',
            reason: '',
        };
    }
    componentDidMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    RenderFooter() {
        if (this.state.showFooter) {
            return (
                <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
            )
        } else {
            return null
        }
    }

    keyboardDidShow = (event) => {
        this.setState({
            showFooter: false
        })
    };

    keyboardDidHide = (event) => {
        this.setState({
            showFooter: true
        })
    };
    submit = value => {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'HomeScreen',
                params: {

                },
            })
        )
    }
    render() {
        const { handleSubmit } = this.props;
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
                        <Text style={{ fontSize: 22, color: '#25345D' }}>Đặt xét nghiệm</Text>
                    </View>
                    <View style={styles.infoArea}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textInfor} >Tên hiển thị:  {this.state.name}</Text>
                        </View>
                        <View style={styles.doubleContainer}>
                            <View style={{
                                width: 180
                            }}>
                                <Text style={styles.textInfor} >Ngày hẹn: {(this.state.date)}</Text>
                            </View>
                            <View style={{
                                width: 120
                            }}>
                                <Text style={styles.textInfor} >Giờ hẹn: {(this.state.time)}</Text>
                            </View>
                        </View>
                    </View>
                    <Field name="reason" keyboardType="default" component={renderField}
                        placeholder="Lý do hủy đơn" secureText={true}
                        onChange={(text) => { this.setState({ reason: text }) }}
                        validate={[required]}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnConfirm} onPress={handleSubmit(this.submit)}>
                            <Text style={styles.textBtn} >{this.state.buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {this.RenderFooter()}
            </View>
        );
    }
}
const CancelRequestForm = reduxForm({
    form: 'cancelRequestForm',
})(CancelRequestScreen);
export default CancelRequestForm;


const { width: WIDTH } = Dimensions.get('window')
const styles = StyleSheet.create({
    input: {
        width: WIDTH - 55,
        borderRadius: 10,
        fontSize: 18,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#0A6ADA',
        backgroundColor: 'rgba(255,255,255,0.7)',
        color: 'black',
        height: 220,
        textAlignVertical: 'top',
    },
    inputContainer: {
        width: WIDTH - 25,
        height: 250,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 1,
    },
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
        flex: 50,
    },
    textInfor: {
        fontSize:  16,
    },
    textContainer: {
        marginTop: 5,
        width: Dimensions.get('window').width - 55,
        alignSelf: 'stretch',
        marginBottom: 5,
        marginHorizontal: 15,
        justifyContent: 'center',
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
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width - 20,
        height: 54,
        marginBottom: 10,
        marginHorizontal: 16,
    },
    btnConfirm: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#0A6ADA',
        paddingBottom: 3,
        marginRight: 20,
    },
    textBtn: {
        color: '#0A6ADA',
        textAlign: "center",
        fontSize: 16,
    },

});
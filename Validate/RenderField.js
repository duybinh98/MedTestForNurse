import React from 'react';
import { Text, View, StyleSheet, Dimensions, } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';



//Field input for redux-form
const renderField = ({
    iconName, iconType, keyboardType, meta: { touched, error, warning }, isSecureText,
    input: { onChange, ...restInput }, placeholder, isEditable,isMultiline , numberOfLines
}) => {
    //validate conditions
    const required = values => values ? undefined : 'Bắt buộc';
    const isNumber = values => values && isNaN(Number(values)) ? 'Phải nhập số' : undefined;
    const isPhonenumber = values => values && values.length == 10 ? undefined : 'Phải có 10 số';
    const isEmail = values =>
        values && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values) ? 'Email không hợp lệ' : undefined;
    const isWeakPassword = values => values && values.length == 6 ? undefined : 'Mật khẩu phải có 6 kí tự';
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
                <Icon
                    name={iconName}
                    type={iconType}
                    color='black'
                    size={32}
                    iconStyle={styles.inputIcon}
                ></Icon>
                <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={isSecureText}
                    keyboardType={keyboardType} editable={isEditable} numberOfLines={numberOfLines}
                    multiline={isMultiline}
                    onChangeText={onChange} {...restInput} autoCapitalize='none'
                ></TextInput>

            </View>           
                {touched && ((error &&<Text style={{ color: 'red', paddingLeft: 45, marginBottom: 5  }}>{error}</Text>) ||
                    (warning &&<Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
    );
}

const { width: WIDTH } = Dimensions.get('window')
const styles = StyleSheet.create({
    // errorContainer: {
    //     width: WIDTH - 25,
    //     height: 60,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginHorizontal: 15,
    //     backgroundColor: 'red',
    //     borderRadius: 15,
    //     marginBottom: 5
    // },
    inputContainer: {
        width: WIDTH - 25,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 1
    },
    inputIcon: {
        position: 'absolute',
        left: 7,
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
})
export default renderField;
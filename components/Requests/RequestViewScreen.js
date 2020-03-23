import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import TestCategoryItem from './TestCategoryItem'
import TestViewItem from './TestViewItem'
import testList from './../../Data/Test'
import {convertDateTimeToDate, convertDateTimeToTime, getStateName, getStateColor} from './../Common/CommonFunction'

export default class RequestViewScreen extends Component {
constructor(props) {
        super(props)
        this.state = {
            name: this.props.route.params.name? this.props.route.params.name : 'Nguyễn Văn A',
            dob: this.props.route.params.dob? this.props.route.params.dob : '01/01/1970',
            phone: this.props.route.params.phone? this.props.route.params.phone : '0123456789',
            address: this.props.route.params.address ? this.props.route.params.address :'Số 123 đường abc, xyz',
            date: this.props.route.params.date ? this.props.route.params.date: '20/20/2020',
            time: this.props.route.params.freeTime? this.props.route.params.freeTime: '17h00',
            status: this.props.route.params.status? this.props.route.params.status:'Đang đợi lấy mẫu',
            statusName: this.props.route.params.status? getStateName(this.props.route.params.status):'Đang đợi lấy mẫu',
            statusColor: this.props.route.params.status? getStateColor(this.props.route.params.status):'#7ab648',
            nurseName: 'Nguyễn Văn B',
            totalAmount: this.props.route.params.totalAmount? this.props.route.params.totalAmount:'free',
            leftButtonText: this.props.route.params.status? this.getLeftButtonName(this.props.route.params.status):'',
            rightButtonText: this.props.route.params.status? this.getRightButtonName(this.props.route.params.status):'Quay lại',
            
        };        
        this.isSelected = this.isSelected.bind(this);
        this.onLeftButtonPress = this.onLeftButtonPress.bind(this);
        this.onRightButtonPress = this.onRightButtonPress.bind(this);
    }
    componentDidUpdate  (prevProps, prevState) {
        //fix to id later
         if (prevProps.route.params.name !== this.props.route.params.name) {
            this.setState(previousState => ({ 
                name: this.props.route.params.name? this.props.route.params.name : 'Nguyễn Văn A',
                dob: this.props.route.params.dob? this.props.route.params.dob : '01/01/1970',
                phone: this.props.route.params.phone? this.props.route.params.phone : '0123456789',
                address: this.props.route.params.address ? this.props.route.params.address :'Số 123 đường abc, xyz',
                date: this.props.route.params.date ? this.props.route.params.date: '20/20/2020',
                time: this.props.route.params.freeTime? this.props.route.params.freeTime: '17h00',
                status: this.props.route.params.status? this.props.route.params.status:'Đang đợi lấy mẫu',
                statusName: this.props.route.params.status? getStateName(this.props.route.params.status):'Đang đợi lấy mẫu',
                statusColor: this.props.route.params.status? getStateColor(this.props.route.params.status):'#7ab648',
                nurseName: 'Nguyễn Văn B',
                totalAmount: this.props.route.params.totalAmount? this.props.route.params.totalAmount:'free',
                leftButtonText: this.props.route.params.status? this.getLeftButtonName(this.props.route.params.status):'',
                rightButtonText: this.props.route.params.status? this.getRightButtonName(this.props.route.params.status):'Quay lại',
            }));
        }
    }



    componentDidMount(){
        
    }

    getLeftButtonName(status){
        switch (status) {
        case 'pending':
            return 'Nhận đơn';
            break;
        case 'coordinatorlostsample':
            return 'Nhận đơn';
            break;
        case 'accepted':
            return 'Hủy';
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
        case 'closed':
            return '';
            break;
        
        } 
    }

getRightButtonName(status){
        switch (status) {
        case 'pending':
            return 'Quay lại';
            break;
        case 'coordinatorlostsample':
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
        case 'closed':
            return 'Quay lại';
            break;
        
        } 
    }


    onLeftButtonPress(){
        switch (this.state.status) {
        case 'pending':
            this.props.navigation.goBack();
            break;
        case 'accepted':
            this.props.navigation.goBack();
            break;
        case 'transporting':
            this.props.navigation.goBack();
            break;
        case 'waitingforresult':
            this.props.navigation.goBack();
            break;
        case 'closed':
            this.props.navigation.goBack();
            break;
        case 'lostsample':
            this.props.navigation.goBack();
            break;
        case 'coordinatorlostsample':
            this.props.navigation.goBack();
            break;
        }  
    }

    onRightButtonPress(){
        switch (this.state.status) {
        case 'pending':
            this.props.navigation.goBack();
            break;
        case 'accepted':
            this.props.navigation.goBack();
            break;
        case 'transporting':
            this.props.navigation.goBack();
            break;
        case 'waitingforresult':
            this.props.navigation.goBack();
            break;
        case 'closed':
            this.props.navigation.goBack();
            break;
        case 'lostsample':
            this.props.navigation.goBack();
            break;
        case 'coordinatorlostsample':
            this.props.navigation.goBack();
            break;
        }  
    }

    isSelected(id) {
        const found = this.props.route.params.selectedTest.findIndex(test => test == id);   
        let result = false;     
        found === -1 ? '' : result=true;     
        return result;
    }

    render(){
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack navigation={this.props.navigation} backScreen={this.props.backScreen ? this.props.backScreen:null}></ScreenTopMenuBack>
                    <ScrollView 
                        style ={styles.background}                                            
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        >            
                        <View style={styles.titleArea}>     
                            <Text style={{fontSize:22,color:'#25345D'}}>Đặt xét nghiệm</Text>
                        </View>
                        <View style={styles.infoArea}>     
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Tên hiển thị:  {this.state.name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Số điện thoại: {this.state.phone}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Ngày sinh: {convertDateTimeToDate(this.state.dob)}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Địa chỉ: {this.state.address}</Text>
                            </View>
                            <View style={styles.doubleContainer}>
                                <View style={{
                                    width:180
                                    }}>
                                    <Text style={styles.textInfor} >Ngày hẹn: {convertDateTimeToDate(this.state.date)}</Text>
                                </View>
                                <View style={{
                                    width:120
                                    }}>
                                    <Text style={styles.textInfor} >Giờ hẹn: {convertDateTimeToTime(this.state.date)}</Text>
                                </View>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textInfor} >Tổng số tiền: {this.state.totalAmount} đ</Text>
                            </View>
                            <View style={styles.doubleContainer}>
                                <View style={{
                                    width:82
                                    }}>
                                    <Text style={styles.textInfor} >Trạng thái:</Text>
                                </View>
                                <View style={{
                                    width:180
                                    }}>
                                    <Text style={[styles.textInfor,{color:this.state.statusColor}]} >{this.state.statusName}</Text>
                                </View>                                                             
                            </View> 
                            <View style={styles.doubleContainer}>
                                <View style={{
                                    width:205
                                    }}>
                                    <Text style={styles.textInfor} >Y tá: {this.state.nurseName}</Text>
                                </View>
                                <View style={{
                                    width:110
                                    }}>
                                    <TouchableOpacity style={[styles.btnConfirm,{height:26,width:100}]} onPress={() => this.props.navigation.navigate('CustomerInformation')}>
                                        <Text style={[styles.textBtn,{fontSize:12}]}>Xem thông tin</Text>
                                    </TouchableOpacity>
                                </View>                                                             
                            </View>                            
                        </View>
                        <View style = {styles.TestListAreaBackground}>
                            <View
                                style = {styles.TestListArea}
                                >
                                <FlatList 
                                    style ={styles.TestListAreaScrollView}                        
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={false}
                                    data={this.props.route.params.testsList}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => {
                                            return (
                                                <TestCategoryItem 
                                                    categoryName={item.testTypeName}
                                                    test = {item.listTest}
                                                    viewOnly = {true}
                                                    isSelected = {this.isSelected}
                                                    >
                                                </TestCategoryItem>                                    
                                            );
                                        }}
                                >                    
                                </FlatList>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            {this.state.leftButtonText?
                            <TouchableOpacity style={styles.btnConfirm}>
                                <Text style={styles.textBtn}
                                    onPress={() => this.onLeftButtonPress()}
                                >{this.state.leftButtonText}</Text>
                            </TouchableOpacity>
                            :<View/>
                            }
                            <TouchableOpacity style={styles.btnConfirm} onPress={() => this.onRightButtonPress()}>
                                <Text style={styles.textBtn} >{this.state.rightButtonText}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
                </View>  
        );
    }
}


const styles = StyleSheet.create({
    background:{
        flex:1, 
        backgroundColor: '#f1f0f0',

    },
    titleArea:{
        height: 50,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        marginTop:10,
        marginBottom:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:3,
        borderRadius:10
    },
    infoArea:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        marginTop:5,
        marginBottom:5,
        marginLeft:10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:10,
        paddingTop:3,
        paddingBottom:5,
    },
    textContainer: {
        marginTop: 5,
        width: Dimensions.get('window').width - 55,
        alignSelf: 'stretch',
        marginBottom:5,
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    textInfor: {
        fontSize: 16,
    },
    doubleContainer:{
        marginTop: 5,
        marginBottom:5,
        width: Dimensions.get('window').width - 55,
        alignSelf: 'stretch',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchArea:{
        height: 40,
        width: Dimensions.get('window').width-40,
        backgroundColor: 'white',
        marginTop:5,
        
        paddingLeft:10,
        paddingRight:5,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#25345D',
        color:'#25345D'
    },
    TestListAreaBackground:{
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:5,
        
    },
    TestListArea:{
        width: Dimensions.get('window').width-20,
        alignSelf: 'stretch',
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
    },
    TestListAreaScrollView:{
        width: Dimensions.get('window').width-40,
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width:Dimensions.get('window').width-20,
        height:54,
        marginBottom:10
    },
    btnConfirm: {
        width: 130,
        height: 45,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderWidth:2,
        borderColor:'#0A6ADA',
        paddingBottom:3
    },
    textBtn: {
        color: '#0A6ADA',
        textAlign: "center",
        fontSize: 16,
    },

});
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';



export default class TestViewItem extends Component {
    
    render(){
        return(
            <View style={[styles.testItem,{
                backgroundColor:this.props.backgroundColor != null ? this.props.backgroundColor : 'white',    
            }]}>
                <View
                    style={{
                        width:styles.testItem.width,
                        height:29,
                        paddingLeft:5,
                        paddingRight:5,
                        paddingTop:3
                    }}
                >
                    <Text style={{
                            fontSize:13,
                            color:'#25345d'
                        }} >{this.props.testName}</Text>
                
                </View>
                <View
                    style={{
                        width:styles.testItem.width,
                        height:15,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        marginBottom:2,
                        paddingRight:10
                    }}
                >
                    <Text
                        style={{
                            fontSize:12,
                            color:'#25345d'
                        }}    
                        >{this.props.testPrice}</Text>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    testItem:{
        height:45,
        width: Dimensions.get('window').width-40,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        //borderWidth:1,
        //borderColor:'#25345d',
    },

});
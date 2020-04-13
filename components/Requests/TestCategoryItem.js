import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Alert} from 'react-native';
import TestViewItem from './TestViewItem'


export default class TestCategoryItem extends Component {
    constructor(props){
        super(props);
        this.state={
            viewTest: true,            
            visible: false
        }
        this.isVisible = this.isVisible.bind(this);
    }

    isVisible(){
        // not view => hide if empty         
        if (!this.props.viewOnly){
            if (Array.isArray(this.props.test) && !this.props.test.length) return false;
            return true;
        }
        // view => hide if no selected
        let result = false;
        this.props.test.forEach(test => {
            this.props.isSelected(test.testID) == true ? result=true : '';  
        });
        return result;
    }

    render(){
        const testList = this.props.test;
        let countHide = 0;
        return(
            <View>
            {this.isVisible() ?
            <View>
                <TouchableOpacity style={styles.testItem}
                    onPress={() =>{
                        this.setState(previousState => ({
                            viewTest: !this.state.viewTest
                        }));
                    }}
                >
                    <View
                        style={{
                            width:styles.testItem.width,
                            height:35,
                            paddingLeft:5,
                            paddingRight:5,         
                        }}
                    >
                        <Text style={{
                                fontSize:17,
                                color:'#25345d'
                            }} >{this.props.categoryName}</Text>
                    
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
                        {/* <Text
                            style={{
                                fontSize:12,
                                color:'#25345d'
                            }}    
                            >{this.props.totalPrice}</Text> */}
                    </View>
                </TouchableOpacity>
                <FlatList 
                    style ={styles.TestListAreaScrollView}                        
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    data={testList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                            this.state.viewTest ? this.props.viewOnly ? this.props.isSelected(item.testID) ? null : countHide+=1 : null : null;
                            return ( 
                                <View>                                 
                                { this.state.viewTest ? this.props.viewOnly ? this.props.isSelected(item.testID) ?
                                    <TestViewItem 
                                    testName={item.testName}
                                    testPrice={item.price}
                                    testID={item.testID}
                                    backgroundColor={(index-countHide) % 2 == 0 ? '#EEE': '#FFF'}
                                    /> : null :
                                    null 
                                     : null}    
                                </View>                          
                            );
                        }}
                />
            </View> : null }
            </View>
        );
    }
}



const styles = StyleSheet.create({
    testItem:{
        height:55,
        width: Dimensions.get('window').width-40,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth:1,
        borderColor:'#25345d',
              
    },
    TestListAreaScrollView:{
        width: Dimensions.get('window').width-40,
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
    },

});
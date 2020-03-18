import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import ScreenBackGround from './../Common/ScreenBackGround';

export default class ArticleListItem extends Component {
    render(){
        const _imageUri = this.props.imageUri;
        const _title = this.props.title;
        const _shortContent = this.props.shortContent;
        const _content = this.props.content;
        return(
            <TouchableOpacity 
                style={styles.articleArea}
                onPress={() => this.props.navigation.dispatch(
                    CommonActions.navigate({
                        name: 'ArticleViewScreen',
                        params: {
                            imageUri: _imageUri,
                            title: _title,
                            content:_content
                        },
                    })
                    )}
                >
                
                    <Image 
                        source={{uri:_imageUri}}
                        style={styles.articleImage}
                        ></Image>
                    <View style={styles.articleTextArea}>
                        <Text style={styles.articleTitle}>{_title}</Text>
                        <Text style={styles.articleShortContent}>{_shortContent}</Text>
                </View>                    
            </TouchableOpacity>        
        );
    }
}
const styles = StyleSheet.create({
    articleArea:{
        height:150,
        width: Dimensions.get('window').width-20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:2,        
        borderRadius:10,
        marginBottom:10
    },
    articleImage:{
        width:120,
        height:120,
        marginLeft:20
    },
    articleTextArea:{
        height:130,
        flex:1,
        marginLeft:10,
        marginRight:20,
        flexDirection: 'column'
    },
    articleTitle:{
        height:48,
        fontSize:19
    },
    articleShortContent:{
        height:80,
        fontSize:13
    }
});
import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {DrawerActions } from '@react-navigation/native';
import ScreenTopMenuBack from './../Common/ScreenTopMenuBack';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';

export default class ArticleViewScreen extends Component {
    
    render(){
        const imageUri = this.props.route.params.imageUri;
        const title = this.props.route.params.title;
        const content = this.props.route.params.content;
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                    <ScrollView 
                        style={styles.articleArea}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                        >
                        <View style={styles.articleTitleArea}>
                            <Text style={styles.articleTitleText}>{title}</Text>
                        </View>
                        <Image 
                            source={{uri:imageUri}}
                            style={styles.articleImage}
                            ></Image>
                        
                        <View style={styles.articleContentArea}>
                            <Text style={styles.articleContentText}>{content}</Text>
                        </View>
                                           
                    </ScrollView>   
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
                </View>  
        );
    }
}



const styles = StyleSheet.create({
    articleArea:{
        flex:1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingBottom:2,        
        borderRadius:10,
        margin:10
    },
    articleImage:{
        width:'60%',
        aspectRatio: 1,
    },
    articleTitleArea:{
        width:'100%',
        alignSelf: 'stretch',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    articleContentArea:{
        width:'100%',
        alignSelf: 'stretch',
        paddingLeft:15,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    articleTitleText:{
        fontSize:23,
        fontWeight: 'bold',
        
    },
    articleContentText:{
        fontSize:16,
        textAlign: 'justify'
    }
});
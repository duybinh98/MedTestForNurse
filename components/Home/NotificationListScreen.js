import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, FlatList, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import ScreenTopMenuBack from './../Common/ScreenTopMenu';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import NotificationItem from './NotificationItem';
// import articlesList from './../../Data/Articles'

export default class NotificationListScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState(previousState => ({
            isLoaded: true,
            items: result
          }));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
    render(){
        const { error, isLoaded, items } = this.state;
        // if (error) {
        // return <div>Error: {error.message}</div>;
        // } else if (!isLoaded) {
        // return <div>Loading...</div>;
        // } else {
        return(
                <View style={{flex:1}}>
                    <ScreenTopMenuBack {...this.props}></ScreenTopMenuBack>
                    <View 
                        style ={styles.background}>            
                        
                        <FlatList
                            style={{                    
                            flex:1,
                            paddingLeft:10,
                            paddingRight:10,
                            paddingTop:20
                            }}
                            keyboardShouldPersistTaps="always"
                            keyboardDismissMode='on-drag'
                            data={this.state.items}
                            renderItem={({item,index}) => {
                                return (
                                    <NotificationItem 
                                        // content={item.content}
                                        content={item.title}
                                        navigation={this.props.navigation}
                                        >
                                    </NotificationItem>
                                );
                            }}
                        >                
                        </FlatList>          
                    </View>
                    <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
                </View>  
        );
        // }
    }
}
const styles = StyleSheet.create({
    background:{
        flex:1, 
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    }, 
});
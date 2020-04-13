import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import NurseInformation from './Account/NurseInformation';
import ChangePassword from './Account/ChangePassword';

import LoginScreen from './Authentication/LoginScreen';

import ArticleViewScreen from './Home/ArticleViewScreen';
import HomeScreen from './Home/HomeScreen';
import NotificationListScreen from './Home/NotificationListScreen';

import RequestListHistoryScreen from './Requests/RequestListHistoryScreen';
import RequestListPendingScreen from './Requests/RequestListPendingScreen';
import RequestListProcessingScreen from './Requests/RequestListProcessingScreen';
import RequestViewScreen from './Requests/RequestViewScreen';
import CancelRequestScreen from './Requests/CancelRequestScreen';

export default class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomeScreen" drawerContent={props => CustomDrawerContent(props)}>
          <Drawer.Screen name="NurseInformation" component={NurseInformation} />
          <Drawer.Screen name="ChangePassword" component={ChangePassword} />

          <Drawer.Screen name="LoginScreen" component={LoginScreen} />


          <Drawer.Screen name="ArticleViewScreen" component={ArticleViewScreen} />
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          <Drawer.Screen name="NotificationListScreen" component={NotificationListScreen} />

          <Drawer.Screen name="RequestListHistoryScreen" component={RequestListHistoryScreen} />
          <Drawer.Screen name="RequestListPendingScreen" component={RequestListPendingScreen} />
          <Drawer.Screen name="RequestListProcessingScreen" component={RequestListProcessingScreen} />
          <Drawer.Screen name="RequestViewScreen" component={RequestViewScreen} />
          <Drawer.Screen name="CancelRequestScreen" component={CancelRequestScreen} />
        </Drawer.Navigator>
      </NavigationContainer>

    );
  }
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          height: 130,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          paddingLeft: 10,
          paddingBottom: 15
        }}
        onPress={() => props.navigation.navigate('NurseInformation')}
      >
        <Icon
          name='user'
          type='antdesign'
          color='#0A6ADA'
          size={60}
          iconStyle={{
            marginLeft: 10,
            marginBottom: 5
          }}
        >
        </Icon>
        <Text style={{
          fontSize: 15,
          color: 'black',
        }}>+84123456789</Text>
        <Text style={{
          fontSize: 20,
          color: 'black',
        }}>Nguyen Van An</Text>
      </TouchableOpacity>
      <View style={{
        marginLeft: 10
      }}>


        <MenuButtonScreenContainer
          screenName='RequestListPendingScreen'
          iconName='linechart'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Tìm đơn xét nghiệm mới'
          navigator={props.navigation}
        />
        <MenuButtonScreenContainer
          screenName='RequestListProcessingScreen'
          iconName='wechat'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Đơn đang nhận'
          navigator={props.navigation}
        />
        <MenuButtonScreenContainer
          screenName='RequestListHistoryScreen'
          iconName='wechat'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Lịch sử nhận đơn xét nghiệm'
          navigator={props.navigation}
        />
        <MenuButtonLinkingContainer
          iconName='phone-call'
          iconType='feather'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Liên hệ'
          link='tel:1900561252'
        />
        <MenuButtonScreenContainer
          screenName='LoginScreen'
          iconName='logout'
          iconType='antdesign'
          iconColor='#0A6ADA'
          iconSize={20}
          screenTitle='Đăng xuất'
          navigator={props.navigation}
        />
      </View>
    </View>
  );
}

function MenuButtonScreenContainer({ screenName, iconName, iconType, iconColor, iconSize, screenTitle, navigator }) {
  return (
    <TouchableOpacity
      style={styles.navigatorButton}
      onPress={() => navigator.dispatch(
        CommonActions.navigate({
          name: screenName,
          params: {
          },
        }))}
    >
      <Icon
        name={iconName}
        type={iconType}
        color={iconColor}
        size={iconSize}
      ></Icon>
      <Text style={styles.navigatorButtonText}>{screenTitle}</Text>
    </TouchableOpacity>

  );
}
function MenuButtonLinkingContainer({ iconName, iconType, iconColor, iconSize, screenTitle, link }) {
  return (
    <TouchableOpacity
      style={styles.navigatorButton}
      onPress={() => Linking.openURL(link)}
    >
      <Icon
        name={iconName}
        type={iconType}
        color={iconColor}
        size={iconSize}
      ></Icon>
      <Text style={styles.navigatorButtonText}>{screenTitle}</Text>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  navigatorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  navigatorButtonText: {
    fontSize: 18,
    marginLeft: 7
  }

});





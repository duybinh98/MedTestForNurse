/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';


import Navigator from './components/Navigator';
//
import store from './components/Store/store';
import React, { Component } from 'react';
import { Provider } from 'react-redux';



console.disableYellowBox = true;
export default class appForm extends Component {
    render(){
        return(
            <Provider store = {store}>
                <Navigator/>
            </Provider>
        );
    }
}


AppRegistry.registerComponent(appName, () =>  appForm);



import React, {Component} from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

export default class ScreenTopMenu extends Component {
    render(){
        return(
            <Icon
                name={this.props.iconName}
                type={this.props.iconType}
                color='#0A6ADA'
                size= {this.props.iconSize = 40 ? this.props.iconSize : 40}
                iconStyle={{
                    height: this.props.iconSize = 40 ? this.props.iconSize : 40,
                    width: this.props.iconSize = 40 ? this.props.iconSize : 40,                    
                }}
            ></Icon>
        );
    }
}

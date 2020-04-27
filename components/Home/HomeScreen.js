import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, FlatList, Alert, BackHandler } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import ScreenTopMenu from './../Common/ScreenTopMenu';
import ScreenBottomMenu from './../Common/ScreenBottomMenu';
import ArticleListItem from './ArticleListItem';
import { getApiUrl } from './../Common/CommonFunction';
import articlesList from './../../Data/Articles';
import requestsList from './../../Data/RequestsList';
import testList from './../../Data/Test';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nurseId: '2',
            error: null,
            articlesList: [],
            testsList: [],
            requestList: requestsList,
            requestPendingList: requestsList,
            requestProcessList: requestsList,
            requestHistoryList: requestsList,
        };
        this.getRequestPendingList = this.getRequestPendingList.bind(this);
        this.getRequestProcessingList = this.getRequestProcessingList.bind(this);
        this.getRequestHistoryList = this.getRequestHistoryList.bind(this);
        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
            console.warn('focus signIn');
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });
        this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
            console.warn('blur signIn');
            BackHandler.removeEventListener(
                'hardwareBackPress',
                this.handleBackButton,
            );
        });
    }
    handleBackButton = () => {
        return true;
    };
    componentWillUnmount() {
        this._unsubscribeSiFocus();
        this._unsubscribeSiBlur();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount() {
        this.callApiArticlesList();
    }


    getRequestPendingList() {
        const _requestList = this.state.requestPendingList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].req_status === 'pending' || _requestList[index].req_status === 'coordinatorlostsample') {
                // _requestList.splice(index, 1);
                result.push(_requestList[index]);
            }
            index -= 1;
        }
        return result;
    }

    getRequestProcessingList() {
        const _requestList = this.state.requestProcessList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].req_status === 'accepted' || _requestList[index].req_status === 'transporting' || _requestList[index].req_status === 'lostsample') {
                // _requestList.splice(index, 1);
                result.push(_requestList[index]);
            }
            index -= 1;
        }
        return result;
    }

    getRequestHistoryList() {
        const _requestList = this.state.requestHistoryList;
        let result = [];
        let index = _requestList.length - 1;
        while (index >= 0) {
            if (_requestList[index].req_status === 'waitingforresult' || _requestList[index].req_status === 'closed') {
                // _requestList.splice(index, 1);
                result.push(_requestList[index]);
            }
            index -= 1;
        }
        return result;
    }

    callApiArticlesList = async () => {
        fetch(getApiUrl() + "/articles/list")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(previousState => ({
                        articlesList: result,
                    }));
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, articlesList } = this.state;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <ScreenTopMenu {...this.props}></ScreenTopMenu>
                <View
                    style={styles.background}>
                    <View style={styles.mainButtonArea}>

                        <Button
                            buttonStyle={[
                                styles.mainButton, {
                                    marginLeft: 40
                                }]}
                            titleStyle={{ color: '#0A6ADA' }}
                            title="Tìm đơn xét nghiệm mới"
                            onPress={() => this.props.navigation.dispatch(
                                CommonActions.navigate({
                                    name: 'RequestListPendingScreen',
                                    params: {
                                        requestPendingList: this.getRequestPendingList(),
                                        // nurseId: this.state.nurseId,
                                    },
                                }))}
                        >\</Button>

                        <Button
                            buttonStyle={[
                                styles.mainButton, {
                                    marginRight: 40
                                }]}
                            titleStyle={{ color: '#0A6ADA' }}
                            title="Các xét nghiệm đang nhận"
                            onPress={() => this.props.navigation.dispatch(
                                CommonActions.navigate({
                                    name: 'RequestListProcessingScreen',
                                    // name: 'RequestListHistoryScreen',
                                    params: {
                                        // requestHistoryList: this.getRequestHistoryList(),
                                        requestProcessingList: this.getRequestProcessingList(),
                                        // nurseId: this.state.nurseId,
                                    },
                                }))}
                        >\</Button>

                    </View>
                    <FlatList
                        style={{
                            flex: 1,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode='on-drag'
                        data={this.state.articlesList}
                        renderItem={({ item }) => {
                            return (
                                <ArticleListItem
                                    image={item.image}
                                    title={item.tittle}
                                    shortContent={item.shortContent}
                                    content={item.content}
                                    navigation={this.props.navigation}
                                >
                                </ArticleListItem>
                            );
                        }}
                        keyExtractor={(article, index) => index.toString()}
                    >
                    </FlatList>
                </View>
                <ScreenBottomMenu {...this.props}></ScreenBottomMenu>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f0f0',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mainButtonArea: {
        height: 140,
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        marginTop: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 3,
        borderRadius: 10
    },
    mainButton: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#0A6ADA',
        borderWidth: 3
    },
});
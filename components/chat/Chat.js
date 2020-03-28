import React, { Component } from "react";
import { GiftedChat } from 'react-native-gifted-chat';
import ChatManage from './ChatManage';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, View } from "react-native";

export default class Chat extends Component {

  state = {
    messages: [],
  };

  render() {
    return (
      <View style={styles.chatStyle}>
        <GiftedChat
          messages={this.state.messages}
          onSend={ChatManage.shared.send}
          user={this.props.navigation.state.params}
        />
        <KeyboardSpacer topSpacing={-50} />
      </View>
    );
  }

  componentDidMount() {

    if (ChatManage.shared.checkIfExistsChat(this.props.navigation.state.params.requestID) == false && this.props.navigation.state.params.count!=0) {
      console.log('No hay chat creado para esta request!');
    }

    ChatManage.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    //this.state.messages = [];
    ChatManage.shared.off();
  }
}

const styles = StyleSheet.create({
  chatStyle: {
    backgroundColor: '#E8CCFF',
    width: '100%',
    height: '100%'
  }
});

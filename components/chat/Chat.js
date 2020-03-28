import React, { Component } from "react";
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from './Fire';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, View} from "react-native";

export default class Chat extends Component {

  state = {
    messages: [],
  };

  render() {
    return (
      <View style={styles.chatStyle}>
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.props.navigation.state.params}
      />
      <KeyboardSpacer topSpacing={-50}/>
      </View>
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

const styles = StyleSheet.create({
  chatStyle: {
    backgroundColor: '#E8CCFF',
    width: '100%',
    height: '100%'
  }
});

import React, { Component } from "react";
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from './Fire';

export default class Chat extends Component {

  state = {
    messages: [],
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.props.user}
      />
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

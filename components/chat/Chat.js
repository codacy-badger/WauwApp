import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, View } from "react-native";
import { db } from "../population/config.js";
import firebase from 'firebase';

export default class Chat extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      messages: [],
      requestID: this.props.navigation.state.params.requestID
    };

    if (this.checkIfExistsChat(this.state.requestID) === false) {
      console.log('==================================CREANDO CHAT==================================');
      this.createChat(this.state.requestID);
    }
  }

  render() {
    return (
      <View style={styles.chatStyle}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.props.navigation.state.params}
        />
        <KeyboardSpacer topSpacing={-50} />
      </View>
    );
  }

  componentDidMount() {
    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    this.state.messages = [];
    this.state.requestID = "";
  }

  checkIfExistsChat = requestID => {
    let result = false;

    db.ref("chats_messages").on("value", snap => {
      snap.forEach(child => {
        if (child.val().request == requestID) {
          console.log('==================================YA EXISTE UN CHAT==================================');
          result = true;
        }

      }
      );
    });

    /* db.ref("chats_messages").orderByChild("request").equalTo(requestID).on("child_added", snap => {
      console.log('==================================YA EXISTE UN CHAT==================================');
      result = true;
    }); */

    return result;

  }

  // Creamos el chat
  createChat = requestID => {
    let id = db.ref("chats_messages").push().key;
    let chatData = {
      id: id,
      request: requestID
    };

    db.ref("chats_messages/" + id).set(chatData);
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  // Traerse los x últimos mensajes del chat
  on = callback =>
    db.ref("chats_messages").child(this.obtenerChatID(this.state.requestID)+"/messages")
      .limitToLast(30)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  // Obtener tiempo actual
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // Crear mensaje
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      db.ref("chats_messages").child(this.obtenerChatID(this.state.requestID)+"/messages").push(message);
    }
  };

  // Obtener el ID del chat
  obtenerChatID = requestID => {
    let chatID;

    db.ref("chats_messages").on("value", snap => {
      snap.forEach(child => {

        if (child.val().request == requestID) {
          chatID = child.val().id;
          console.log(chatID);
        }

      }
      );
    });

    return chatID;
  }
}

const styles = StyleSheet.create({
  chatStyle: {
    backgroundColor: '#E8CCFF',
    width: '100%',
    height: '100%'
  }
});

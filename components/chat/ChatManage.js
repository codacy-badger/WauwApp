import firebase from 'firebase';
import { db } from "../population/config.js";

export default class ChatManage {

  // Referenciar la tabla chats
  get ref() {
    return firebase.database().ref('chats_messages');
  }

  checkIfExistsChat = requestID => {
    let result = false;

    db.ref("chats_messages").on("value", snap => {
      snap.forEach(child =>{

        if (child.val().request == requestID){
          console.log('==================================YA EXISTE UN CHAT==================================');
          result = true;
        }

      }
      );
    });

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
    this.ref.child("-M2xGgaH_81bw4opSX3V/messages")
      .limitToLast(20)
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
      this.append(message);
    }
  };

  // Obtener el ID del chat
  obtenerChatID = requestID => {
    let chatID;

    db.ref("chats_messages").on("value", snap => {
      snap.forEach(child =>{

        if (child.val().request == requestID){
          chatID = child.val().id;
          console.log(chatID);
        }

      }
      );
    });

    return chatID;
  }

  // Meter mensaje en la tabla
  append = message => this.ref.child("-M2xGgaH_81bw4opSX3V/messages").push(message);

  //Eliminar referencia
  off() {
    this.ref.off();
  }
}

ChatManage.shared = new ChatManage();

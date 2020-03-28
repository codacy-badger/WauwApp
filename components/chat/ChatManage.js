import firebase from 'firebase';

export default class ChatManage {

  // Referenciar la tabla chats
  get ref() {
    return firebase.database().ref('chats');
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
    this.ref
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

  // Meter mensaje en la tabla
  append = message => this.ref.push(message);

  //Eliminar referencia
  off() {
    this.ref.off();
  }
}

ChatManage.shared = new ChatManage();

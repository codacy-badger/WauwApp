import React from "react";
import { View, Text, Button } from "react-native";
import { db } from "../population/config";
import { TextInput } from "react-native";

export default function Home() {

  const populteUsers = () => {
    /*
    Admin users
    */

    let idRolAdmin = db.ref().child('rol').push().key;
    let query = db.ref().child('rol/' + idRolAdmin);
    query.set({
      id: idRolAdmin,
      nombre: 'administrador'
    });

    let idUAAdmin = db.ref().child('user_account').push().key;
    query = db.ref().child('user_account/' + idUAAdmin);
    query.set({
      id: idUAAdmin,
      username: 'usernameAdmin1',
      //MD5 hash for password passwordAdmin1
      password: '19f989b798aa3bb9bdb53394dceacf2c',
      rol: [idRolAdmin]
    });

    let idAdmin = db.ref().child('administrator').push().key;
    query = db.ref().child('administrator/' + idAdmin);
    query.set({
      id: idAdmin,
      name: 'AdminName1',
      surname: 'AdminSurname1',
      dni: '11111111H',
      photo: 'https://picsum.photos/',
      avgScore: 7.27,
      user_account: idUAAdmin
    });
    console.log("Popula al primer admin");

    idRolAdmin = db.ref().child('rol').push().key;
    query = db.ref().child('rol/' + idRolAdmin);
    query.set({
      id: idRolAdmin,
      nombre: 'administrator'
    });

    idUAAdmin = db.ref().child('user_account').push().key;
    query = db.ref().child('user_account/' + idUAAdmin);
    query.set({
      id: idUAAdmin,
      username: 'usernameAdmin2',
      //MD5 hash for password passwordAdmin2
      password: '3e2d086cbf3854d53afdf5ae87db0f39',
      rol: [idRolAdmin]
    });

    idAdmin = db.ref().child('administrator').push().key;
    query = db.ref().child('administrator/' + idAdmin);
    query.set({
      id: idAdmin,
      name: 'AdminName2',
      surname: 'AdminSurname2',
      dni: '12345678A',
      photo: 'https://picsum.photos/',
      avgScore: 4.96,
      user_account: idUAAdmin
    });

    /* 
    Wauwers users
    */

    let idRolWauwer = db.ref().child('rol').push().key;
    query = db.ref().child('rol/' + idRolWauwer);

    query.set({
      id: idRolWauwer,
      nombre: 'wauwer'
    });

    let idUAWauwer = db.ref().child('user_account').push().key;
    query = db.ref().child('user_account/' + idUAWauwer);
    query.set({
      id: idUAWauwer,
      username: 'usernameWauwer1',
      //MD5 hash for password usernamePassword1
      password: '2ccb842f36e0b9026649b91c756460a7',
      rol: idRolWauwer
    });



    let idWauwer = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + idWauwer);
    console.log("Popula el usuario", 1)
    query.set({
      id: idWauwer,
      name: 'WauwerName1',
      surname: 'WauwerSurname1',
      dni: '11111112L',
      photo: 'https://picsum.photos/',
      avgScore: 7.25,
      wauwPoints: 145,
      paypalURL: 'www.paypal.com',
      petNumber: 2,
      description: 'Tengo dos perretes muy monos con ganas de ser paseados porque mi dueño tiene que realizar horas extras y trabajar los fines de semana en la empresa aunque eso es ilegal.'
    });

    idRolWauwer = db.ref().child('rol').push().key;
    query = db.ref().child('rol/' + idRolWauwer);
    
    query.set({
      id: idRolWauwer,
      nombre: 'wauwer'
    });

    idUAWauwer = db.ref().child('user_account').push().key;
    query = db.ref().child('user_account/' + idUAWauwer);

    query.set({
      id: idUAWauwer,
      username: 'usernameWauwer2',
      password: '6e1fc9f971967bea754a6d37d98484ee',
      rol: idRolWauwer
    });

    idWauwer = db.ref().child('wauwers').push().key;
    query = db.ref().child('wauwers/' + idWauwer);

    query.set({
      id: idWauwer,
      name: 'Wauwer2',
      surname: 'WauwerSurname2',
      dni: '11122233A',
      photo: 'https://picsum.photos/',
      avgScore: 8.99,
      wauwPoints: 100,
      paypalURL: 'www.paypal.com',
      petNumber: 1,
      description: 'Torrente es un perro gordo, vago y salido. Pero cuando sale, se tira sobre el primer perro que ve'
    });
  };

  return (
    <View>
      <Text> Página del home</Text>
      <Button onPress={populteUsers} title={"Popular usuarios"} />
    </View>
  );
}

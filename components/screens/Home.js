import React from "react";
import { View, Text, Button } from "react-native";
import { db } from "../population/config";

export default function Home() {
  const populteUsers = () => {
    alert("Entra al populador");
    let id = db.ref().child("wauwers").push().key;
    var query = db.ref().child("wauwers/" + id);
    console.log("Popula el usuario", 1)
    query.set({
      id: id,
      email: "nombre" + 1 + "@nombre.com",
      name: "Nombre " + 1,
      surname: "Apellido " + 1,
      admin: true,
      pets: [
        {
          name: "Perro " + 1,
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
    console.log("Popula el usuario", 2)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 2 + "@nombre.com",
      name: "Nombre " + 2,
      surname: "Apellido " + 2,
      admin: false,
      pets: [
        {
          name: "Perro " + 2,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        },
        {
          name: "Perro " + 2,
          birthDate: new Date(),
          ppp: false,
          breed: "Yorkshire"
        }
      ]
    });
    console.log("Popula el usuario", 3)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 3 + "@nombre.com",
      name: "Nombre " + 3,
      surname: "Apellido " + 3,
      admin: false,
      pets: [
        {
          name: "Perro " + 3,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
    console.log("Popula el usuario", 4)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 4 + "@nombre.com",
      name: "Nombre " + 4,
      surname: "Apellido " + 4,
      admin: false,
      pets: [
        {
          name: "Perro " + 4,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
    console.log("Popula el usuario", 5)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 5 + "@nombre.com",
      name: "Nombre " + 5,
      surname: "Apellido " + 5,
      admin: false,
      pets: [
        {
          name: "Perro " + 5,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
    console.log("Popula el usuario", 6)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 6 + "@nombre.com",
      name: "Nombre " + 6,
      surname: "Apellido " + 6,
      admin: false,
      pets: [
        {
          name: "Perro " + 6,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
    console.log("Popula el usuario", 7)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 7 + "@nombre.com",
      name: "Nombre " + 7,
      surname: "Apellido " + 7,
      admin: false,
      pets: [
        {
          name: "Perro " + 7,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
    console.log("Popula el usuario", 8)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 8 + "@nombre.com",
      name: "Nombre " + 8,
      surname: "Apellido " + 8,
      admin: false,
      pets: [
        {
          name: "Perro " + 8,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
    console.log("Popula el usuario", 9)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 9 + "@nombre.com",
      name: "Nombre " + 9,
      surname: "Apellido " + 9,
      admin: false,
      pets: [
        {
          name: "Perro " + 9,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
    console.log("Popula el usuario", 10)
    id = db.ref().child("wauwers").push().key;
    query = db.ref().child("wauwers/" + id);
    query.set({
      id: id,
      email: "nombre" + 10 + "@nombre.com",
      name: "Nombre " + 10,
      surname: "Apellido " + 10,
      admin: false,
      pets: [
        {
          name: "Perro " + 10,
          birthDate: new Date(),
          ppp: true,
          breed: "Pastor alemán"
        }
      ]
    });
  };
  return (
    <View>
      <Text> Página del home</Text>
      <Button onPress={populteUsers} title={"Popular usuarios"} />
    </View>
  );
}

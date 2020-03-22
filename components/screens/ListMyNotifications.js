import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import { Image } from "react-native-elements";
import { db } from "../population/config";
import Loading from "../Loading";
import { YellowBox } from "react-native";
import _ from "lodash";
import { email } from "../account/QueriesProfile";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default function ListWalkRequests(props) {
  const { toastRef } = props;
  const [requestsList, setRequestsList] = useState([]);
  const [reloadRequests, setReloadRequests] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  let id;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      id = snap.val().id;
    });

  useEffect(() => {
    db.ref("request")
      .orderByChild("workerId")
      .equalTo(id)
      .on("value", snap => {
        const requests = [];
        snap.forEach(child => {
          requests.push(child.val());
        });
        setRequestsList(requests);
      });
    setReloadRequests(false);
    setIsVisibleLoading(false);
  }, [reloadRequests]);

  return (
    <View>
      {requestsList ? (
        <FlatList
          data={requestsList}
          renderItem={request => (
            <Request
              req={request}
              setReloadRequests={setReloadRequests}
              setIsVisibleLoading={setIsVisibleLoading}
              toastRef={toastRef}
            />
          )}
          keyExtractor={request => request.id}
        />
      ) : (
        <View>
          <Text>No requests</Text>
        </View>
      )}
      <Loading isVisible={isVisibleLoading} text={"Un momento..."} />
    </View>
  );
}

function Request(props) {
  const { req, setReloadRequests, setIsVisibleLoading, toastRef } = props;
  let estado = "";
  let tipo = "";
  let numeroMascotas = "";
  let owner;
  db.ref("wauwers")
    .child(req.item.ownerId)
    .on("value", snap => {
      owner = snap.val();
    });

  if (req.item.pending == "true") {
    estado = "Pendiente";
  } else {
    switch (req.item.isCanceled) {
      case "false":
        estado = "Aceptada";
        break;
      case "true":
        estado = "Rechazada";
        break;
      default:
        break;
    }
  }

  if (req.item.type == "WALK") {
    tipo = "paseo";
  } else if (req.item.type == "SITTER") {
    tipo = "alojamiento";
  }

  const checkRequestsState = () => {
    if (estado == "Pendiente") {
      itemClicked();
    } else if (estado == "Aceptada") {
      requestClosed("aceptado");
    } else if (estado == "Rechazada") {
      requestClosed("rechazado");
    }
  };

  const requestClosed = action => {
    Alert.alert("¡Ya has " + action + " esta solicitud!", "");
  };

  const itemClicked = () => {
    Alert.alert(
      "Aceptar o Rechazar solicitud",
      "",
      [
        {
          text: "Más tarde"
        },
        {
          text: "Aceptar",
          onPress: confirmAcceptRequest,
          style: "cancel"
        },
        {
          text: "Rechazar",
          onPress: confirmDeclineRequest,
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const confirmAcceptRequest = () => {
    Alert.alert(
      "Aceptar solicitud",
      "¿Estás seguro?",
      [
        {
          text: "Si",
          onPress: acceptRequest
        },
        {
          text: "No",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const acceptRequest = () => {
    setIsVisibleLoading(true);
    //Actualizo la request en la tabla de request
    let requestData = {
      pending: "false",
      isCanceled: "false"
    };
    db.ref("request")
      .child(req.item.id)
      .update(requestData)
      .then(() => {
        setReloadRequests(true);
        toastRef.current.show("Solicitud aceptada con éxito");
      })
      .catch(() => {
        toastRef.current.show("Error. Inténtelo de nuevo");
      });
  };

  const confirmDeclineRequest = () => {
    Alert.alert(
      "Rechazar solicitud",
      "¿Estás seguro?",
      [
        {
          text: "Si",
          onPress: declineRequest
        },
        {
          text: "No",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const declineRequest = () => {
    setIsVisibleLoading(true);
    let requestData = {
      pending: "false",
      isCanceled: "true"
    };
    db.ref("request")
      .child(req.item.id)
      .update(requestData)
      .then(() => {
        setReloadRequests(true);
        toastRef.current.show("Solicitud rechazada");
      })
      .catch(() => {
        toastRef.current.show("Error. Inténtelo de nuevo.");
      });
  };
  //<Button title="ACEPTAR" onPress={updateRequest} />
  //<Button title="RECHAZAR" onPress={confirmDeleteRequest} />
  //<Text>Info: {req.item.info.substr(0, 30)}...</Text>

  let fondo = "white";
  if (estado == "Aceptada") {
    fondo = "rgba(0,128,0,0.6)";
  } else if (estado == "Rechazada") {
    fondo = "rgba(255,0,0,0.6)";
  } else if (estado == "Pendiente") {
    fondo = "rgba(255,128,0,0.6)";
  }

  const changeBgColor = {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: fondo,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  };

  return (
    <TouchableOpacity onPress={checkRequestsState}>
      <View style={changeBgColor}>
        <Image style={styles.image} source={{ uri: owner.photo }} />
        <View style={styles.requestContent}>
          <Text>
            Solicitud de {tipo} de: {owner.name}
          </Text>
          <Text>Servicio para {req.item.petNumber} mascotas.</Text>
          <Text>Estado de la solicitud: {estado}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60
  },
  request: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "rgba(255,0,0,0.6)",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    padding: 10
  },
  requestContent: {
    marginHorizontal: 12,
    marginVertical: 5,
    flex: 1,
    flexDirection: "column"
  }
});

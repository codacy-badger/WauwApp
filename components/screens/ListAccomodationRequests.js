import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
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

export default function ListAccomodationRequests(props) {
  const { toastRef } = props;
  const [requestsList, setRequestsList] = useState([]);
  const [reloadRequests, setReloadRequests] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  useEffect(() => {
    db.ref("request")
      .orderByChild("worker/email")
      .equalTo(email)
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

  if (req.item.pending == "true") {
    estado = "Pendiente";
  } else {
    switch (req.item.isCancelled) {
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
          onPress: acceptRequest,
          style: "cancel"
        },
        {
          text: "Rechazar",
          onPress: confirmDeleteRequest,
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const confirmDeleteRequest = () => {
    Alert.alert(
      "Rechazar solicitud",
      "¿Estás seguro?",
      [
        {
          text: "Si",
          onPress: deleteRequest
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
    let userData = {
      pending: "false",
      isCancelled: "false"
    };
    db.ref("request")
      .child(req.item.id)
      .update(userData)
      .then(() => {
        setReloadRequests(true);
        toastRef.current.show("Solicitud aceptada con éxito");
        // setIsLoading(false);
        //setReloadRequests(false);
        // setIsVisibleModal(false);
      })
      .catch(() => {
        toastRef.current.show("Error. Inténtelo de nuevo.");
        //setError("Ha ocurrido un error");
        //setIsLoading(false);
      });
  };

  const deleteRequest = () => {
    setIsVisibleLoading(true);
    let userData = {
      pending: "false",
      isCancelled: "true"
    };
    db.ref("request")
      .child(req.item.id)
      .update(userData)
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

  return (
    <TouchableOpacity onPress={itemClicked}>
      <View style={styles.request}>
        <View style={styles.requestContent}>
          <Text>Propietario: {req.item.owner.name}</Text>
          <Text>Trabajador: {req.item.worker.name}</Text>
          <Text>Info: {req.item.info.substr(0, 30)}...</Text>
          <Text>Estado: {estado}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  request: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6
  },
  requestContent: {
    marginHorizontal: 18,
    marginVertical: 10
  }
});

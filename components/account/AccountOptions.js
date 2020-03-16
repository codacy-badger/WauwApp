import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "./Modal";
import ChangeNameForm from "./ChangeNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeDescriptionForm from "./ChangeDescriptionForm";

export default function AccountOptions(props) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const { userInfo, setReloadData } = props;

  const menuOptions = [
    {
      title: "Cambiar nombre y apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("name")
    },
    {
      title: "Cambiar descripción",
      iconType: "material-community",
      iconNameLeft: "lead-pencil",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("description")
    }
  ];

  const selectedComponent = form => {
    switch (form) {
      case "name":
        setRenderComponent(
          <ChangeNameForm
            id={userInfo.id}
            name={userInfo.name}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
          />
        );
        setIsVisibleModal(true);
        break;
      case "description":
        setRenderComponent(
          <ChangeDescriptionForm
            id={userInfo.id}
            desc={userInfo.description}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
    setIsVisibleModal(true);
  };

  return (
    <View style={styles.menuItems}>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 5
  },
  menuItems: {
    marginTop: 10
  }
});

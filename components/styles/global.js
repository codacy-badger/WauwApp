import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#443099",
    width: "75%",
    height: "45%",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5
  },
  btnTextStyle: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: "700"
  },
  contentText: {
    fontSize: 18,
    fontWeight: "100",
    marginTop: 10,
    fontWeight: "300"
  },
  safeArea: {
    flex: 1
  },
  drawerView: {
    height: 150,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerImage: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
});

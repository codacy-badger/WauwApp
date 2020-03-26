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
  /* Profile Drawer */
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
  },
  /* Login Screen */
  loginImage: {
    height: "45%",
    width: "70%",
    resizeMode: "stretch",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: -20
  },
  loginBtn: {
    backgroundColor: "#443099",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 5,
    width: "100%",
    height: "50%",
    justifyContent: "flex-start"
  },
  loginBtnContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "75%",
    height: "8%",
    backgroundColor: "#443099",
    marginTop: 60,
    marginRight: 20,
    marginLeft: 20
  },
  loginPrints: {
    height: "10%",
    width: "85%",
    resizeMode: "stretch",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 20
  },
  loginBtnTittle: {
    marginLeft: 40
  },
  loginView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 60,
    marginBottom: 60
  }
});

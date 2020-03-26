import React, { useState, useEffect } from "react";
import { View } from "react-native";
import _ from 'lodash';
import Chat from "../chat/Chat";
import { email } from '../account/QueriesProfile';
import { db } from "../population/config.js";

export default function Chats() {
  //const toastRef = useRef();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function (snap) {
        snap.forEach(function (child) {
          setUserInfo(child.val());
        });
      });
  }, []);

  return (
    <Chat user={{
      name: userInfo.name,
      _id: userInfo.id,
      avatar: userInfo.photo
    }}></Chat>
  );
}


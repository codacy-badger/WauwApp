import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import InfoUser from './InfoUser';
import { users } from '../population/config';
import AccountOptions from './AccountOptions';


export default function UserGuest() {
  const [userInfo, setUserInfo] = useState({});

  //console.log(users[0].name);

  //   useEffect(() => {
  //     (async () => {})();
  //   }, []);

        })();
    }, []);

    return (
        <View style={styles.viewUserInfo}>
            <InfoUser userInfo={users[0]}/>
            <AccountOptions></AccountOptions>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
      minHeight: "100%",
      backgroundColor: "#f2f2f2"
    }
  });
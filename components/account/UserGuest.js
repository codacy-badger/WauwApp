import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import InfoUser from './InfoUser';
import { users } from '../population/config';

export default function UserGuest() {
    const [userInfo, setUserInfo] = useState({});

    //console.log(users[0].name);

    useEffect(() => {
        (async () => {

        })();
    }, []);

    return (
        <View>
            <InfoUser userInfo={users[0]}/>
        </View>
    );
}
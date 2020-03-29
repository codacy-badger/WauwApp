import React from 'react';
import {render} from 'react-native-testing-library';
// import Home from '../screens/Home';
import Services from '../screens/Services';
// import { NavigationContainer } from '@react-navigation/native';
// import { navigationRef } from './RootNavigation';

describe('<Services />', () => {
    it('should match snapshot', () => {
        const result = render(<Services />).toJSON;
        expect(result).toMatchSnapshot();
    });
});
import React from 'react';
import renderer from 'react-test-renderer';
import SearchWalks from '../../screens/SearchWalks';
import mockStore from 'redux-mock-store';

describe('<SearchWalks />', () => {
  it('testing the login', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<SearchWalks navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
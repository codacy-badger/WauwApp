import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../../App';

describe('<App />', () => {
  it('testing the login', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
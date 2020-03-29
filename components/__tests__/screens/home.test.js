import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../../screens/Home';

//Enzyme.configure({ adapter: new Adapter() });

it('renders a HomeScreen using Snapshots', () =>{
  const component = renderer.create(
    <HomeScreen
    />
  ).toJSON();
  expect(component).toMatchSnapshot();
});

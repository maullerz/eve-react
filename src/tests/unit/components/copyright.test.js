import React from 'react';
import Copyright from './../../../app/components/blocks/_copyright';
import renderer from 'react-test-renderer';

test('Render _copyright block', () => {
  const component = renderer.create(
    <Copyright />
  );
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
});
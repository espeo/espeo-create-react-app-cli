import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { {{capitalize name}} } from '../{{toLowerCase name}}.component';

describe('{{capitalize name}} Component', () => {
  test('should be defined', () => {
    const component = renderer.create(<{{capitalize name}} />);
    expect(component).toBeDefined();
  });

  test('should match snapshot', () => {
    const component = renderer.create(<{{capitalize name}} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should contains text', () => {
    const text = shallow(<{{capitalize name}} />)
      .children()
      .text();
    expect(text).toEqual('{{capitalize name}} component works!');
  });
});

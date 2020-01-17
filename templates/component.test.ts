{{setVar "capitalizedName" (capitalize name)}}
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { {{capitalizedName}} } from '../{{toLowerCase name}}.component';

describe('{{capitalizedName}} Component', () => {
  test('should be defined', () => {
    const component = renderer.create(<{{capitalizedName}} />);
    expect(component).toBeDefined();
  });

  test('should match snapshot', () => {
    const component = renderer.create(<{{capitalizedName}} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should contains text', () => {
    const text = shallow(<{{capitalizedName}} />)
      .children()
      .text();
    expect(text).toEqual('{{capitalizedName}} component works!');
  });
});

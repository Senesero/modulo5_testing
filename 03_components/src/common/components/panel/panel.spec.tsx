import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Panel } from './panel';

describe('commom/components/panel tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      title: 'test title',
    };

    // Act
    const component = shallow(
      <Panel {...props}>
        <h2>Test children component</h2>
      </Panel>
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      title: 'test title',
    };

    // Act
    const component = mount(
      <Panel {...props}>
        <h2>Test children component</h2>
      </Panel>
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});

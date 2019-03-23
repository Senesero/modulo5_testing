import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Body } from './body';

describe('pages/members/list/components/body tests', () => {
    it('should render as expected when passing required properties', () => {
        // Arrange
        const props = {
            members: [
                {
                    id: 1,
                    name: 'login 1',
                    avatarUrl: 'avatar 1',
                },
                {
                    id: 2,
                    name: 'login 2',
                    avatarUrl: 'avatar 2',
                },
            ],
        };

        // Act
        const component = shallow(
            <Body {...props} />
        );

        // Assert
        expect(component).toMatchSnapshot();
    });

    it('should render as expected when passing required properties with mount', () => {
        // Arrange
        const props = {
            members: [
                {
                    id: 1,
                    name: 'login 1',
                    avatarUrl: 'avatar 1',
                },
                {
                    id: 2,
                    name: 'login 2',
                    avatarUrl: 'avatar 2',
                },
            ],
        };

        // Act
        const component = mount(
            <Body {...props} />
        );

        // Assert
        expect(component).toMatchSnapshot();
    });
});

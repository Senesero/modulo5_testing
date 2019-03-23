import * as React from 'react';
import { shallow } from 'enzyme';
import { MemberListPageContainer } from './pageContainer';
import configureStore from 'redux-mock-store';
import { State } from '../../reducers';
import * as actions from './actions/fetchMembers';
import * as mappers from './mappers';

const getMockStore = configureStore();

describe('pages/members/list/pageContainer tests', () => {
  it('should render as expected passing state', () => {
    // Arrange
    const state = {
      members: [
        {
          id: 1,
          login: 'login 1',
          avatar_url: 'avatar 1',
        },
        {
          id: 2,
          login: 'login 2',
          avatar_url: 'avatar 2',
        },
      ],
    } as State;

    const store = getMockStore(state);

    // Act
    const component = shallow(
      <MemberListPageContainer />, {
        context: { store },
      }
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call to fetchMembers action creator when call to fetchMembers prop', () => {
    // Arrange
    const state = {
      members: [
        {
          id: 1,
          login: 'login 1',
          avatar_url: 'avatar 1',
        },
        {
          id: 2,
          login: 'login 2',
          avatar_url: 'avatar 2',
        },
      ],
    } as State;

    const stub = jest.spyOn(actions, 'fetchMembers')
      .mockReturnValue({
        type: 'test type',
      });

    const store = getMockStore(state);

    // Act
    const component = shallow(
      <MemberListPageContainer
      />,
      {
        context: { store },
      }
    );

    component.prop('fetchMembers')('test fieldName', 'test value');

    // Assert
    expect(stub).toHaveBeenCalled();
  });

  it('should call to mapMemberListModelToVM when render component', () => {
    // Arrange
    const state = {
      members: [
        {
          id: 1,
          login: 'login 1',
          avatar_url: 'avatar 1',
        },
        {
          id: 2,
          login: 'login 2',
          avatar_url: 'avatar 2',
        },
      ],
    } as State;

    const store = getMockStore(state);

    const mapMemberListModelToVMStub = jest.spyOn(mappers, 'mapMemberListModelToVM')
      .mockReturnValue({
        type: 'test type',
      });

    // Act
    const component = shallow(
      <MemberListPageContainer
      />,
      {
        context: { store },
      }
    );

    // Assert
    expect(mapMemberListModelToVMStub).toHaveBeenCalledWith(state.members);
  });
});

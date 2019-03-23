// import { FieldValidationResult } from 'lc-form-validation';
import deepFreeze from 'deep-freeze';
import { actionIds } from '../actions/actionIds';
import { membersReducer, MembersState } from './members';
import { Member } from '../../../../rest-api/model';

describe('members/list/reducers/members tests', () => {
  it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
    const state = undefined;
    const action = { type: 'some type' };

    // Act
    const nextState = membersReducer(state, action);

    // Assert
    expect(nextState).toEqual([]);
  });

  it('should return same state without mutate it when passing state and some action type', () => {
    // Arrange
    const state: MembersState = [
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
    ];
    const action = { type: 'some type' };
    deepFreeze(state);

    // Act
    const nextState = membersReducer(state, action);

    // Assert
    expect(nextState[0].id).toEqual(1);
    expect(nextState[0].login).toEqual('login 1');
    expect(nextState[0].avatar_url).toEqual('avatar 1');
    expect(nextState[1].id).toEqual(2);
    expect(nextState[1].login).toEqual('login 2');
    expect(nextState[1].avatar_url).toEqual('avatar 2');
  });

  it(`should return updated state mutate it
  when passing state, UPDATE_MEMBERS action type and login members payload`, () => {
      // Arrange
      const state: MembersState = [
        {
          id: 1,
          login: 'login 3',
          avatar_url: 'avatar 1',
        },
        {
          id: 2,
          login: 'login 2',
          avatar_url: 'avatar 2',
        },
      ];

      const action = {
        type: actionIds.UPDATE_MEMBERS,
        payload: [
          {
            id: 1,
            login: 'login 1',
            avatar_url: '',
          },
        ] as Member[],
      };

      deepFreeze(state);

      // Act
      const nextState = membersReducer(state, action);

      // Assert
      expect(nextState[0].id).toEqual(1);
      expect(nextState[0].login).toEqual('login 1');
      expect(nextState[0].avatar_url).toEqual('');
    });
});

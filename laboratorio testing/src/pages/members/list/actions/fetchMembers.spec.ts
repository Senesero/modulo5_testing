import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import * as apiMember from '../../../../rest-api/api/member';
import { fetchMembers } from './fetchMembers';
import { Member } from '../../../../rest-api/model';
import { actionIds } from './actionIds';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('members/list/actions/fetchMembers tests', () => {
  it('should call fetchMembers', async () => {
    // Arrange
    const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers')
      .mockResolvedValue([]);

    // Act
    const store = getMockStore();
    await store.dispatch<any>(fetchMembers());

    // Assert
    expect(fetchMembersStub).toHaveBeenCalled();
  });

  it(`should dispatch action with type UPDATE_MEMBERS and payload with return members`, async () => {
      // Arrange
      const members: Member[] = [
        {
          id: 1,
          login: 'login 1',
          avatar_url: 'url 1',
        },
        {
          id: 2,
          login: 'login 2',
          avatar_url: 'url 2',
        },
      ];

      const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers')
        .mockResolvedValue(members);

      // Act
      const store = getMockStore();
      await store.dispatch<any>(fetchMembers())
        .then(() => {
          // Assert
          const expectedAction = store.getActions()[0];
          expect(expectedAction.type).toEqual(actionIds.UPDATE_MEMBERS);
          expect(expectedAction.payload).toEqual(members);
          expect(fetchMembersStub).toHaveBeenCalled();
        });
    });

  it('should call console.log when failed', async () => {
    // Arrange
    const error = 'error';
    const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers')
      .mockRejectedValue(error);

    const consoleLogStub = jest.spyOn(window.console, 'log');

    // Act
    const store = getMockStore();
    await store.dispatch<any>(fetchMembers())
      .then(() => {
        // Assert
        expect(consoleLogStub).toHaveBeenCalledWith(error);
      });
  });
});

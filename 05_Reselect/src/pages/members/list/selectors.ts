import { createSelector } from 'reselect';

import { State } from '../../reducers';
import { mapMemberListModelToVM } from './mappers';

export const getMembers = (state: State) => state.members;

export const getMembersVM = createSelector(
    getMembers,
    (members) => mapMemberListModelToVM(members)
);

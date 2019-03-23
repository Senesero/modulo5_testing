import { createSelector } from 'reselect';

import { State } from '../reducers';
import { mapLoginEntityVMToModel } from './mappers';

export const getLogin = (state: State) => state.login;

export const getLoginVMEntity = createSelector(
    getLogin,
    (login) => mapLoginEntityVMToModel(login.loginEntity)
);

export const getLoginVMloginFormErrors = createSelector(
    getLogin,
    (login) => login.loginFormErrors
);

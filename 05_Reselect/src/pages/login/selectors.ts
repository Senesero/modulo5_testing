import { State } from '../reducers';

const getLogin = (state: State) => state.login;
export const getLoginEntity = (state: State) => {
    return getLogin(state).loginEntity;
};
export const getLoginFormErrors = (state: State) => {
    return getLogin(state).loginFormErrors;
};

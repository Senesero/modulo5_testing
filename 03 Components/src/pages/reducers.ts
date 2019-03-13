import { combineReducers } from 'redux';
import { loginReducer, LoginState } from './login/reducers';

export interface State {
    login: LoginState;
}

export const reducers = combineReducers<State>({
    login: loginReducer,
});

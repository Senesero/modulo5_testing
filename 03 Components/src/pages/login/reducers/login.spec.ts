import { loginReducer, LoginState } from './login';
import { createEmptyLoginEntity, createEmptyLoginFormErrors } from '../viewModel';
import { FieldValidationResult } from 'lc-form-validation';
import { actionIds } from '../actions/actionIds';
import deepFreeze from 'deep-freeze';

describe('pages/login/reducers/loginReducers specs', () => {
    it('should return initial state when passing state equals undefined and some action', () => {
        // Arrange
        const state = undefined;
        const action = { type: 'some type' };

        // Act
        const result = loginReducer(state, action);

        // Assert
        expect(result).toEqual({
            loginEntity: createEmptyLoginEntity(),
            loginFormErrors: createEmptyLoginFormErrors(),
        } as LoginState);
    });

    it('should return same state when passing state with some values and some action', () => {
        // Arrange
        const state: LoginState = {
            loginEntity: {
                login: 'test login',
                password: 'test password',
            },
            loginFormErrors: {
                login: new FieldValidationResult(),
                password: new FieldValidationResult(),
            },
        };
        const action = { type: 'some type' };

        // Act
        const result = loginReducer(state, action);

        // Assert
        expect(result).toEqual(state);
    });

    it(`should return same state when passing state with
        some values and action with type UPDATE_LOGIN_ENTITY_FIELD`, () => {
            // Arrange
            const state: LoginState = {
                loginEntity: {
                    login: 'test login',
                    password: 'test password',
                },
                loginFormErrors: {
                    login: new FieldValidationResult(),
                    password: new FieldValidationResult(),
                },
            };
            const action = {
                type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
                payload: {
                    fieldName: 'login',
                    value: 'updated value',
                    fieldValidationResult: {
                        succeded: true,
                    },
                },
            };

            deepFreeze(state);

            // Act
            const result = loginReducer(state, action);

            // Assert
            expect(result).toEqual({
                loginEntity: {
                    login: 'updated value',
                    password: 'test password',
                },
                loginFormErrors: {
                    login: {
                        succeded: true,
                    },
                    password: new FieldValidationResult(),
                },
            });
        });

    it(`should return same state when passing state with
        some values and action with type UPDATE_LOGIN_FORM_ERRORS`, () => {
            // Arrange
            const state: LoginState = {
                loginEntity: {
                    login: 'test login',
                    password: 'test password',
                },
                loginFormErrors: {
                    login: new FieldValidationResult(),
                    password: new FieldValidationResult(),
                },
            };
            const action = {
                type: actionIds.UPDATE_LOGIN_FORM_ERRORS,
                payload: {
                    login: {
                        succeded: false,
                        errorMessage: 'test login message',
                    },
                    password: {
                        succeded: false,
                        errorMessage: 'test password message',
                    },
                },
            };

            deepFreeze(state);

            // Act
            const result = loginReducer(state, action);

            // Assert
            expect(result).toEqual({
                loginEntity: {
                    login: 'test login',
                    password: 'test password',
                },
                loginFormErrors: {
                    login: {
                        succeded: false,
                        errorMessage: 'test login message',
                    },
                    password: {
                        succeded: false,
                        errorMessage: 'test password message',
                    },
                },
            });
        });
});

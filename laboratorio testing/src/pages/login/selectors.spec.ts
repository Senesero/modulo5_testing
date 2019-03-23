import { getLogin, getLoginVMEntity, getLoginVMloginFormErrors } from './selectors';
import { State } from '../reducers';
import * as mappers from './mappers';
import * as vm from './viewModel';
import { FieldValidationResult } from 'lc-form-validation';

describe('pages/members/list/selectors specs', () => {
    describe('getLogin', () => {
        it('should return the expected members from state', () => {
            // Arrange
            const state = {
                login: {
                    loginEntity: vm.createEmptyLoginEntity(),
                    loginFormErrors: vm.createEmptyLoginFormErrors(),
                },
            } as State;

            // Act
            const result = getLogin(state);

            // Assert
            expect(result).toEqual(state.login);
        });
    });

    describe('getLoginVMEntity', () => {
        it('should return the expected mapped member list', () => {
            // Arrange
            const state = {
                login: {
                    loginEntity: {
                        login: 'test login',
                        password: 'test password',
                    },
                    loginFormErrors: {
                        login: new FieldValidationResult(),
                        password: new FieldValidationResult(),
                    },
                },
            } as State;

            const expectedMappedLoginEntity: vm.LoginEntity = {
                login: 'test login',
                password: 'test password',
            };

            const mapMemberListModelToVMStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
                .mockReturnValue(expectedMappedLoginEntity);

            // Act
            const result = getLoginVMEntity(state);

            // Assert
            expect(mapMemberListModelToVMStub).toHaveBeenCalled();
            expect(result).toEqual(expectedMappedLoginEntity);
        });
    });
});

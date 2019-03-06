import { FieldValidationResult } from 'lc-form-validation';
import { updateLoginEntityFieldCompleted, updateLoginEntityField } from './updateLoginEntityField';
import { actionIds } from './actionIds';
import { validations } from '../validations';
import { LoginEntity } from '../viewModel';
import configuraStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';

const getMockStore = configuraStore([reduxThunk]);

describe('pages/login/actions/updateLoginEntityField specs', () => {
    describe('updateLoginEntityFieldCompleted', () => {
        it(`should return action type UPDATE_LOGIN_ENTITY_FIELD and payload with value 
        when passing fieldName, value and validationResult`, () => {
                // Arrange
                const fieldName = 'test fieldName';
                const value = 'test value';
                const validationResult = new FieldValidationResult();
                validationResult.succeeded = true;

                // Act
                const result = updateLoginEntityFieldCompleted(fieldName, value, validationResult);

                // Assert
                expect(result).toEqual({
                    type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
                    payload: {
                        fieldName: 'test fieldName',
                        value: 'test value',
                        validationResult,
                    },
                });
            });
    });

    describe('updateLoginEntityField', () => {
        it('should call to validateField with loginEntity, fieldName and value', (done) => {
            // Arrange
            const loginEntity: LoginEntity = {
                login: 'test login',
                password: 'test password',
            };
            const fieldName = 'login';
            const value = 'update value';
            const stub = jest.spyOn(validations, 'validateField');

            // Act
            const store = getMockStore();
            const fn = updateLoginEntityField(loginEntity, fieldName, value);
            store.dispatch<any>(fn).then(() => {
                // Assert
                expect(stub).toHaveBeenCalledWith(loginEntity, fieldName, value);
                done();
            });
        });

        it(`should dispatch action with type UPDATE_LOGIN_ENTITY_FIELD 
            and payload with fieldName, value and validationResult`, (done) => {
            // Arrange
            const loginEntity: LoginEntity = {
                login: 'test login',
                password: 'test password',
            };
            const fieldName = 'login';
            const value = '';
            const mockValidationResult = new FieldValidationResult();
            mockValidationResult.succeeded = true;
            const stub = jest.spyOn(validations, 'validateField')
                .mockResolvedValue(mockValidationResult);

            // Act
            const store = getMockStore();
            const fn = updateLoginEntityField(loginEntity, fieldName, value);
            store.dispatch<any>(fn).then(() => {
                // Assert
                const expectedAction = store.getActions()[0];
                expect(expectedAction.type).toEqual(actionIds.UPDATE_LOGIN_ENTITY_FIELD);
                expect(expectedAction.payload).toEqual({
                    fieldName: 'login',
                    value: '',
                    validationResult: mockValidationResult,
                });
                done();
            });
        });
    });
});

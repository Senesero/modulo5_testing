import { FieldValidationResult } from 'lc-form-validation';
import { actionIds } from './actionIds';
import { LoginEntity } from '../viewModel';
import { validations } from '../validations';

export const updateLoginEntityField = (
    loginEntity: LoginEntity,
    fieldName: string,
    value: string
) => ((dispatch) => {
    const promise = validations
        .validateField(loginEntity, fieldName, value)
        .then((validationResult) => {
            const action = updateLoginEntityFieldCompleted(fieldName, value, validationResult);
            if (validationResult.succeeded) {
                dispatch(action);
            }
        });
    return promise;
});

export const updateLoginEntityFieldCompleted = (
    fieldName: string,
    value: string,
    validationResult: FieldValidationResult
) => ({
    type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
    payload: {
        fieldName,
        value,
        validationResult,
    },
});

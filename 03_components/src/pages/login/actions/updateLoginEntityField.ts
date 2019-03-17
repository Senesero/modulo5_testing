import { FieldValidationResult } from 'lc-form-validation';
import { actionIds } from './actionIds';
import { validations } from '../validations';
import { LoginEntity } from '../viewModel';

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

export const updateLoginEntityFieldCompleted =
  (fieldName: string, value: any, fieldValidationResult: FieldValidationResult) => ({
    type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
    payload: {
      fieldName,
      value,
      fieldValidationResult,
    },
  });

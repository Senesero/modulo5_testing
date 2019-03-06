import { LoginEntity } from '../../../rest-api/model/loginEntity';
import { validations } from '../validations';
import { mapLoginEntityVMToModel } from '../mappers';
import { login } from '../../../rest-api/api/login';
import { history } from '../../../history';
import { routes } from '../../../common/constants/routes';
import { actionIds } from './actionIds';

export const loginRequest = (loginEntity: LoginEntity) => (dispatch) => {
    const promise = validations.validateForm(loginEntity).then(
        (validationResult) => {
            const action = displayErrors(validationResult.fieldErrors);
            validationResult.succeeded ?
                doLogin(loginEntity) :
                dispatch(action);
        }
    );
    return promise;
};

const doLogin = (loginEntity: LoginEntity) => {
    const loginEntityModel = mapLoginEntityVMToModel(loginEntity);
    login(loginEntityModel)
        .then(() => history.push(routes.members))
        .catch((error) => console.log(error));
};

const displayErrors = (fieldErrors) => ({
    type: actionIds.UPDATE_LOGIN_FORM_ERRORS,
    payload: fieldErrors,
});

import { LoginEntity } from '../viewModel';
import configuraStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { loginRequest } from './loginRequest';
import { validations } from '../validations';
import * as mappers from '../mappers';
import * as api from '../../../rest-api/api/login';
import { history } from '../../../history';
import { routes } from '../../../common/constants/routes';

// import configureStore from 'redux-mock-store';
// import { FieldValidationResult } from 'lc-form-validation';
// import { routes } from '../../../common/constants/routes';
// import { actionIds } from './actionIds';

const getMockStore = configuraStore([reduxThunk]);

describe('pages/login/actions/loginRequest specs', () => {
    it('should call to validateForm with loginEnti', (done) => {
        // Arrange
        const loginEntity: LoginEntity = {
            login: 'test login',
            password: 'test password',
        };

        const stub = jest.spyOn(validations, 'validateForm');

        // Act
        const store = getMockStore();
        const fn = loginRequest(loginEntity);
        store.dispatch<any>(fn)
            .then(() => {
                // Assert
                expect(stub).toHaveBeenCalledWith(loginEntity);
                done();
            });
    });

    it('should call to map and login when validationResult equals succeeded', (done) => {
        // Arrange
        const loginEntity: LoginEntity = {
            login: 'test login',
            password: 'test password',
        };

        // const stub = jest.spyOn(validations, 'validateForm')
        //     .mockResolvedValue({ succeeded: true});

        const mockLoginEntity = {
            login: 'mock login',
            password: 'mock password',
        };

        const mapStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
            .mockReturnValue(mockLoginEntity);

        const apiStub = jest.spyOn(api, 'login').mockResolvedValue({});

        const historyStub = jest.spyOn(history, 'push');

        // Act
        const store = getMockStore();
        const fn = loginRequest(loginEntity);
        store.dispatch<any>(fn)
            .then(() => {
                // Assert
                expect(mapStub).toHaveBeenCalledWith(loginEntity);
                expect(apiStub).toHaveBeenCalledWith(mockLoginEntity);
                expect(historyStub).toHaveBeenCalledWith(routes.members);
                done();
            });
    });

    it('should call to console.log when login is failed', async () => {
        // Arrange
        const loginEntity: LoginEntity = {
            login: 'test login',
            password: 'test password',
        };
        
        const mockLoginEntity = {
            login: 'mock login',
            password: 'mock password',
        };

        const mapStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
            .mockReturnValue(mockLoginEntity);

        const mockError = 'test error';

        const apiStub = jest.spyOn(api, 'login').mockRejectedValue(mockError);

        const historyStub = jest.spyOn(history, 'push');

        const consoleLogStub = jest.spyOn(window.console, 'log');

        // Act
        const store = getMockStore();
        const fn = loginRequest(loginEntity);
        await store.dispatch<any>(fn);

        // Assert
        expect(mapStub).toHaveBeenCalledWith(loginEntity);
        expect(apiStub).toHaveBeenCalledWith(mockLoginEntity);
        expect(historyStub).not.toHaveBeenCalledWith();
        expect(consoleLogStub).toHaveBeenCalledWith(mockError);
    });

});

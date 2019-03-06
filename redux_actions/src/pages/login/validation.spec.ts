import { validations } from './validations';

describe('/pages/login/validations specs', () => {
    it('should return failed validation when passing login field with empty value', (done) => {
        // Arrange
        const vm = {
            login: null,
        };

        const field = 'login';
        const value = '';

        // Act
        validations.validateField(vm, field, value)
            .then((result) => {
                // Assert
                expect(result.succeeded).toBeFalsy();
                expect(result.errorMessage).toEqual('Please fill in this mandatory field.');
                done();
            });
    });

    it('should return succeeded validation when passing login field equals "test"', (done) => {
        // Arrange
        const vm = {
            login: null,
        };

        const field = 'login';
        const value = 'test';

        // Act
        validations.validateField(vm, field, value)
            .then((result) => {
                // Assert
                expect(result.succeeded).toBeTruthy();
                expect(result.errorMessage).toEqual('');
                done();
            });
    });

    it('should return succeeded validation when passing password field equals "test"', async () => {
        // Arrange
        const vm = {
            login: null,
        };

        const field = 'password';
        const value = 'test';

        // Act
        const result = await validations.validateField(vm, field, value);

        // Assert
        expect(result.succeeded).toBeTruthy();
        expect(result.errorMessage).toEqual('');
    });
});

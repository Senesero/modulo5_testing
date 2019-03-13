import { mapLoginEntityVMToModel } from './mappers';
import * as vm from './viewModel';

describe('pages/login/mappers spec', () => {
    describe('mapLoginEntityVMToModel', () => {
        it('should return same values when passing loginEntity with value', () => {
            // Arrange
            const loginEntity: vm.LoginEntity = {
                login: 'test login',
                password: 'test password',
            };

            // Act
            const result = mapLoginEntityVMToModel(loginEntity);

            // Assert
            expect(result).toEqual({
                login: 'test login',
                password: 'test password',
            });
        });

        it('should return null when passing loginEntity equals null', () => {
            // Arrange
            const loginEntity: vm.LoginEntity = null;

            // Act
            const result = mapLoginEntityVMToModel(loginEntity);

            // Assert
            expect(result).toBeNull();
        });

        it('should return null when passing loginEntity equals undefined', () => {
            // Arrange
            const loginEntity: vm.LoginEntity = undefined;

            // Act
            const result = mapLoginEntityVMToModel(loginEntity);

            // Assert
            expect(result).toBeNull();
        });

    });
});

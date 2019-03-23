import * as model from '../../../rest-api/model';
import { mapMemberListModelToVM, mapMemberModelToVM } from './mappers';
import * as mappers from './mappers';
import * as vm from './viewModel';

describe('pages/members/list/mappers specs', () => {
    describe('mapMemberModelToVM', () => {
        it('should return transform member model to the view model', () => {
            // Arrange
            const member: model.Member = {
                id: 1,
                login: 'login 1',
                avatar_url: 'avatar 1',
            };

            const resultExpected: vm.Member = {
                id: 1,
                name: 'login 1',
                avatarUrl: 'avatar 1',
            };

            // Act
            const result = mapMemberModelToVM(member);

            // Assert
            expect(result).not.toEqual(resultExpected);
        });

        it('prueba travis should return transform member model to the view model', () => {
            // Arrange
            const member: model.Member = {
                id: 1,
                login: 'login 1.2',
                avatar_url: 'avatar 1',
            };

            const resultExpected: vm.Member = {
                id: 1,
                name: 'login 1.2',
                avatarUrl: 'avatar 1',
            };

            // Act
            const result = mapMemberModelToVM(member);

            // Assert
            expect(result).not.toEqual(resultExpected);
        });
    });

    describe('mapMemberListModelToVM', () => {
        it('should return empty array when passing members equals undefined', () => {
            // Arrange
            const members: model.Member[] = undefined;

            // Act
            const result = mapMemberListModelToVM(members);

            // Assert
            expect(result).toEqual([]);
        });

        it('should return empty array when passing members something distint than array', () => {
            // Arrange
            const members: model.Member[] = null;

            // Act
            const result = mapMemberListModelToVM(members);

            // Assert
            expect(result).toEqual([]);
        });

        it('should return empty array when passing members equals empty array', () => {
            // Arrange
            const members: model.Member[] = [];

            // Act
            const result = mapMemberListModelToVM(members);

            // Assert
            expect(result).toEqual([]);
        });

        it('should return array with items when passing members with items ', () => {
            // Arrange
            const members: model.Member[] = [
                {
                    id: 1,
                    login: 'login 1',
                    avatar_url: 'avatar 1',
                },
                {
                    id: 2,
                    login: 'login 2',
                    avatar_url: 'avatar 2',
                },
            ];

            const resultExpected: vm.Member[] = [
                {
                    id: 1,
                    name: 'login 1',
                    avatarUrl: 'avatar 1',
                },
                {
                    id: 2,
                    name: 'login 2',
                    avatarUrl: 'avatar 2',
                },
            ];

            // Act
            const result = mapMemberListModelToVM(members);

            // Assert
            expect(result).toEqual(resultExpected);
        });
    });
});

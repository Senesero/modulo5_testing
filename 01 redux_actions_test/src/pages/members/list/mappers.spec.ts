import { mapMemberListModelToVM } from './mappers';
import * as model from '../../../rest-api/model';
import * as vm from './viewModel';

describe('pages/members/list/mappers spec', () => {
    describe('mapMemberListModelToVM', () => {
        it('should return empty array when passing members equals null', () => {
            // Arrange
            const members = null;

            // Act
            const result = mapMemberListModelToVM(members);

            // Assert
            expect(result).toEqual([]);
        });

        it('should return empty array when passing members equals undefined', () => {
            // Arrange
            const members = undefined;

            // Act
            const result = mapMemberListModelToVM(members);

            // Assert
            expect(result).toEqual([]);
        });

        it('should return empty array when passing members equals empty array', () => {
            // Arrange
            const members = [];

            // Act
            const result = mapMemberListModelToVM(members);

            // Assert
            expect(result).toEqual([]);
        });

        it('should return array with one mapped item when passing members equals array with one item', () => {
            // Arrange
            const members: model.Member[] = [{
                id: 2,
                login: 'test login',
                avatar_url: 'test avatar_url',
            }];

            // Act
            const result = mapMemberListModelToVM(members);

            // Assert
            expect(result).toEqual([{
                id: 2,
                name: 'test login',
                avatarUrl: 'test avatar_url',
            }] as vm.Member[]);
        });
    });
});

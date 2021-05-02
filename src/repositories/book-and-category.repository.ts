import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {BookAndCategory, BookAndCategoryRelations} from '../models';

export class BookAndCategoryRepository extends DefaultCrudRepository<
  BookAndCategory,
  typeof BookAndCategory.prototype.id,
  BookAndCategoryRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(BookAndCategory, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {CategoryAndBook, CategoryAndBookRelations} from '../models';

export class CategoryAndBookRepository extends DefaultCrudRepository<
  CategoryAndBook,
  typeof CategoryAndBook.prototype.id,
  CategoryAndBookRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(CategoryAndBook, dataSource);
  }
}

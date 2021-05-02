import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Book, BookRelations, Category, BookAndCategory} from '../models';
import {BookAndCategoryRepository} from './book-and-category.repository';
import {CategoryRepository} from './category.repository';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.id,
  BookRelations
> {

  public readonly categories: HasManyThroughRepositoryFactory<Category, typeof Category.prototype.id,
          BookAndCategory,
          typeof Book.prototype.id
        >;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('BookAndCategoryRepository') protected bookAndCategoryRepositoryGetter: Getter<BookAndCategoryRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Book, dataSource);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoryRepositoryGetter, bookAndCategoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Category, CategoryRelations, Book, CategoryAndBook} from '../models';
import {CategoryAndBookRepository} from './category-and-book.repository';
import {BookRepository} from './book.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly books: HasManyThroughRepositoryFactory<Book, typeof Book.prototype.id,
          CategoryAndBook,
          typeof Category.prototype.id
        >;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('CategoryAndBookRepository') protected categoryAndBookRepositoryGetter: Getter<CategoryAndBookRepository>, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>,
  ) {
    super(Category, dataSource);
    this.books = this.createHasManyThroughRepositoryFactoryFor('books', bookRepositoryGetter, categoryAndBookRepositoryGetter,);
    this.registerInclusionResolver('books', this.books.inclusionResolver);
  }
}

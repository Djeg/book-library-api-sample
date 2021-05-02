import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Category,
CategoryAndBook,
Book,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryBookController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/books', {
    responses: {
      '200': {
        description: 'Array of Category has many Book through CategoryAndBook',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Book)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Book>,
  ): Promise<Book[]> {
    return this.categoryRepository.books(id).find(filter);
  }

  @post('/categories/{id}/books', {
    responses: {
      '200': {
        description: 'create a Book model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInCategory',
            exclude: ['id'],
          }),
        },
      },
    }) book: Omit<Book, 'id'>,
  ): Promise<Book> {
    return this.categoryRepository.books(id).create(book);
  }

  @patch('/categories/{id}/books', {
    responses: {
      '200': {
        description: 'Category.Book PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Partial<Book>,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.categoryRepository.books(id).patch(book, where);
  }

  @del('/categories/{id}/books', {
    responses: {
      '200': {
        description: 'Category.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.categoryRepository.books(id).delete(where);
  }
}

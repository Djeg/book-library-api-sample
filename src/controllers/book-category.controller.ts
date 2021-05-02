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
Book,
BookAndCategory,
Category,
} from '../models';
import {BookRepository} from '../repositories';

export class BookCategoryController {
  constructor(
    @repository(BookRepository) protected bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Book has many Category through BookAndCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Category>,
  ): Promise<Category[]> {
    return this.bookRepository.categories(id).find(filter);
  }

  @post('/books/{id}/categories', {
    responses: {
      '200': {
        description: 'create a Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Book.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategoryInBook',
            exclude: ['id'],
          }),
        },
      },
    }) category: Omit<Category, 'id'>,
  ): Promise<Category> {
    return this.bookRepository.categories(id).create(category);
  }

  @patch('/books/{id}/categories', {
    responses: {
      '200': {
        description: 'Book.Category PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Partial<Category>,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.bookRepository.categories(id).patch(category, where);
  }

  @del('/books/{id}/categories', {
    responses: {
      '200': {
        description: 'Book.Category DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.bookRepository.categories(id).delete(where);
  }
}
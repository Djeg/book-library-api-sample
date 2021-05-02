import {Entity, model, property, hasMany} from '@loopback/repository';
import {Category} from './category.model';
import {BookAndCategory} from './book-and-category.model';

@model({settings: {strict: false}})
export class Book extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  shortDescription: string;

  @property({
    type: 'number',
    required: true,
  })
  stars: number;

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  images?: object[];

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'date',
    required: true,
    default: Date.now(),
  })
  publishedAt: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @hasMany(() => Category, {through: {model: () => BookAndCategory}})
  categories: Category[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;

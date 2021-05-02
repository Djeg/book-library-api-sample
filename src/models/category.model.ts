import {Entity, model, property, hasMany} from '@loopback/repository';
import {Book} from './book.model';
import {CategoryAndBook} from './category-and-book.model';

@model({settings: {strict: false}})
export class Category extends Entity {
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

  @hasMany(() => Book, {through: {model: () => CategoryAndBook}})
  books: Book[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;

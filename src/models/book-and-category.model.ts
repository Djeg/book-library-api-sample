import {Entity, model, property} from '@loopback/repository';

@model()
export class BookAndCategory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  bookId?: number;

  @property({
    type: 'number',
  })
  categoryId?: number;

  constructor(data?: Partial<BookAndCategory>) {
    super(data);
  }
}

export interface BookAndCategoryRelations {
  // describe navigational properties here
}

export type BookAndCategoryWithRelations = BookAndCategory & BookAndCategoryRelations;

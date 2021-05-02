import {Entity, model, property} from '@loopback/repository';

@model()
export class CategoryAndBook extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  categoryId?: number;

  @property({
    type: 'number',
  })
  bookId?: number;

  constructor(data?: Partial<CategoryAndBook>) {
    super(data);
  }
}

export interface CategoryAndBookRelations {
  // describe navigational properties here
}

export type CategoryAndBookWithRelations = CategoryAndBook & CategoryAndBookRelations;

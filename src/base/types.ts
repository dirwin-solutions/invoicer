export interface DatabaseEntity {
  id: number,
  createdAt: Date,
  updatedAt?: Date
}
export type CreateInput<T> = Omit<T, 'id' | 'updatedAt' | 'createdAt'>
export type Detail<T> = Omit<T, 'createdAt' | 'updatedAt'>
export type UpdateInput<T> = Partial<CreateInput<T>> & { updatedAt?: Date }

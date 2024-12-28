export type CreateInput<T> = Omit<T, 'id' | 'updatedAt' | 'createdAt'>
export type UpdateInput<T> = Partial<CreateInput<T>> & { updatedAt?: Date }

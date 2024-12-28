function serializeValue(value: any): any {
  if(value instanceof Date) {
    return value.toISOString()
  } else if(typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE'
  } else {
    return value
  }
}

export function serializeData(data: Record<string, any>): Record<string, any> {
  const serialized: any = {}
  for(let key of Object.keys(data)) {
    serialized[key] = serializeValue(data[key])
  }
  return serialized
}

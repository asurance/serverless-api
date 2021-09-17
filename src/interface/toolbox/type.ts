import { ObjectId } from 'mongodb'

export type Tool = {
  _id: string
  name: string
  url: string
  description: string
  tags: string
}

export type Config = NumberConfig | StringConfig

export type NumberConfig = {
  _id: ObjectId
  type: 'number'
  key: string
  number: number
}

export type StringConfig = {
  _id: ObjectId
  type: 'string'
  key: string
  string: string
}

export type UpdateData = {
  updateTime: number
  inserts: Tool[]
  updates: (Partial<Tool> & { _id: string })[]
  deletes: string[]
}

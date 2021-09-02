import { APIResult } from '../../type'
import { useDatabase } from '../../useDataBase'
import { Tool } from './type'

export async function main(): Promise<APIResult<Tool[]>> {
  return useDatabase('toolbox', async (db) => {
    const documents = await db.collection<Tool>('config').find().toArray()
    console.log('Query successfully', documents)
    return documents
  })
}

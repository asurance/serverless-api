import { APIResult, Tool } from '../../interface'
import { useDatabase } from '../../useDataBase'

export async function main(): Promise<APIResult<Tool[]>> {
  return useDatabase('toolbox', async (db) => {
    const documents = await db.collection<Tool>('config').find().toArray()
    console.log('Query successfully', documents)
    return documents
  })
}

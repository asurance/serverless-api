import { APIResult } from '../../type'
import { useDatabase } from '../../useDataBase'
import { NumberConfig, Tool } from './type'

type Output = {
  updateTime: number
  tools: Tool[]
}

export async function main(): Promise<APIResult<Output>> {
  return useDatabase('toolbox', async (db) => {
    const updateTime = await db
      .collection<NumberConfig>('config')
      .findOne({ key: 'updateTime' })
    if (updateTime === null) {
      throw new Error('Query updateTime but find null')
    }
    const documents = await db.collection<Tool>('tools').find().toArray()
    console.log('Query tools successfully', documents)
    return {
      updateTime: updateTime.number,
      tools: documents,
    }
  })
}

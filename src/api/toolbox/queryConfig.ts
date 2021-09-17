import { APIResult, CollectionName } from '../../type'
import { useDatabase } from '../../useDataBase'
import { NumberConfig, Tool } from '../../interface/toolbox/type'

type Output = {
  updateTime: number
  tools: Tool[]
}

export async function main(): Promise<APIResult<Output>> {
  return useDatabase('toolbox', async (db, session) => {
    const updateTime = await db
      .collection<NumberConfig>(CollectionName.Config)
      .findOne({ key: 'updateTime' }, { session })
    if (updateTime === null) {
      throw new Error('Query updateTime but find null')
    }
    const documents = await db
      .collection<Tool>(CollectionName.Tools)
      .find({}, { session })
      .toArray()
    console.log('Query tools successfully', documents)
    return {
      updateTime: updateTime.number,
      tools: documents,
    }
  })
}

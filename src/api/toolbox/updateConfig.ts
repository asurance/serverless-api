import { APIResult, CollectionName, EventInput } from '../../type'
import { useDatabase } from '../../useDataBase'
import { Tool, UpdateData } from '../../interface/toolbox/type'

export async function main(event: EventInput): Promise<APIResult<true>> {
  return useDatabase('toolbox', async (db, session) => {
    const data = JSON.parse(event.body) as Partial<UpdateData> & {
      updateTime: number
    }
    await db.collection(CollectionName.Config).updateOne(
      {
        key: 'updateTime',
      },
      {
        $set: { number: data.updateTime },
      },
    )
    const tools = db.collection<Tool>(CollectionName.Tools)
    if (data.inserts) {
      await tools.insertMany(data.inserts, { session })
    }
    if (data.deletes) {
      await tools.deleteMany({ _id: { $in: data.deletes } }, { session })
    }
    if (data.updates) {
      for (const update of data.updates) {
        await tools.updateOne(
          { _id: update._id },
          { $set: update },
          { session },
        )
      }
    }
    return true as const
  })
}

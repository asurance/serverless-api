import { APIResult, EventInput } from '../../type'
import { useDatabase } from '../../useDataBase'

export async function main(event: EventInput): Promise<APIResult<true>> {
  return useDatabase('toolbox', async (db) => {
    return true as const
  })
}

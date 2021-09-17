import { ClientSession, Db, MongoClient } from 'mongodb'
import { ParseError } from './common'
import { APIResult } from './type'
import { url } from '../config.json'

export async function useDatabase<Data>(
  name: string,
  callback: (db: Db, session: ClientSession) => Data | Promise<Data>,
): Promise<APIResult<Data>> {
  let client: MongoClient | null = null
  let session: ClientSession | null = null
  try {
    client = await MongoClient.connect(url)
    session = client.startSession()
    console.log('Connect successfully', url)
    session.startTransaction()
    const data = await callback(client.db(name), session)
    await session.commitTransaction()
    await session.endSession()
    return {
      success: true,
      data,
    }
  } catch (error) {
    if (session) {
      await session.abortTransaction()
    }
    const errStr = ParseError(error)
    console.log(errStr)
    return {
      success: false,
      message: errStr,
    }
  } finally {
    if (client) {
      client.close()
    }
  }
}

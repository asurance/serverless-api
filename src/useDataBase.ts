import { Db, MongoClient } from 'mongodb'
import { ParseError } from './common'
import { APIResult } from './interface'
import config from '../config.json'

export async function useDatabase<Data>(
  name: string,
  callback: (db: Db) => Data | Promise<Data>,
): Promise<APIResult<Data>> {
  let client: MongoClient | null = null
  try {
    client = await MongoClient.connect(config.url)
    console.log('Connect successfully', config.url)
    const data = await callback(client.db(name))
    return {
      success: true,
      data,
    }
  } catch (error) {
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

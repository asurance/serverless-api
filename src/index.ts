// import { MongoClient } from 'mongodb'

// const url = 'mongodb://localhost:27017'

import { main } from './api/toolbox/queryConfig'

// async function main() {
//   let db: MongoClient | null = null
//   try {
//     db = await MongoClient.connect(url)
//     console.log('connect successfully')
//     const test = db.db('test')
//     const result = await test.collection('test-data').insertOne({
//       name: 'Hello world',
//     })
//     console.log(result)
//     await db.close()
//   } catch (err) {
//     if (db) {
//       db.close()
//     }
//   }
// }

main()

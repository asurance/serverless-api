import { APIResult, EventInput } from '../type'
import { password, secretId, secretKey } from '../../config.json'

type KeyData = {
  secretId: string
  secretKey: string
}

export async function main(event: EventInput): Promise<APIResult<KeyData>> {
  if (event.queryString.password === password) {
    return {
      success: true,
      data: {
        secretId,
        secretKey,
      },
    }
  } else {
    return {
      success: false,
      message: 'unknown password',
    }
  }
}

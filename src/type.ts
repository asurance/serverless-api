export const enum CollectionName {
  Config = 'config',
  Tools = 'tools',
}

export type APISuccess<T> = {
  success: true
  data: T
}

export type APIFail = {
  success: false
  message: string
}

export type APIResult<T> = APISuccess<T> | APIFail

export type EventInput = {
  requestContext: {
    serviceId: string
    path: string
    httpMethod: string
    stage: string
    requestId: string
    identity: {
      secretId: string
    }
    sourceIp: string
  }
  path: string
  httpMethod: string
  queryString: { [key: string]: string }
  body: string
  headers: { [key: string]: string }
  pathParameters: { [key: string]: string }
  queryStringParameters: { [key: string]: string }
  headerParameters: { [key: string]: string }
}
